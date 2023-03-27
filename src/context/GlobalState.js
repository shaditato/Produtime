import { createContext, useEffect, useReducer } from "react";
import {
  Timestamp,
  addDoc,
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  updateDoc,
  where,
  writeBatch as createWriteBatch,
  deleteDoc,
  arrayRemove,
} from "firebase/firestore";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useToast } from "use-toast-mui";
import { AppReducer } from "./AppReducer";
import { FIRESTORE_MAX_BATCH_SIZE } from "../data/constants";
import { auth, db } from "../firebase/config";
import { chunk } from "../utils/";

const initialState = {
  activeTimers: [],
  user: undefined,
  projects: {},
  tags: {},
  timers: [],
};

export const GlobalContext = createContext(initialState);

export function GlobalProvider({ children }) {
  const [state, dispatch] = useReducer(AppReducer, initialState);
  const toast = useToast();

  // Update user in state when Firebase updates auth
  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      try {
        // Handle sign out
        if (user === null) {
          dispatch({
            type: "SET_STATE",
            payload: { user },
          });
          return;
        }
        // Read projects & timers from database on sign-in
        const projectsSnapshot = await getDocs(
          collection(db, "users", user.uid, "projects")
        );
        const tagsSnapshot = await getDocs(
          collection(db, "users", user.uid, "tags")
        );
        const timersSnapshot = await getDocs(
          query(
            collection(db, "users", user.uid, "timers"),
            orderBy("createdAt", "desc")
          )
        );
        const projects = projectsSnapshot.docs.reduce((projects, doc) => {
          return {
            ...projects,
            [doc.id]: doc.data(),
          };
        }, {});
        const tags = tagsSnapshot.docs.reduce((tags, doc) => {
          return {
            ...tags,
            [doc.id]: doc.data().name,
          };
        }, {});
        const timers = timersSnapshot.docs.map((doc) => {
          return {
            ...doc.data(),
            id: doc.id,
          };
        });
        dispatch({
          type: "SET_STATE",
          payload: {
            user,
            projects,
            timers,
            tags,
          },
        });
        toast.success(`Signed in as ${user.displayName}`);
      } catch (error) {
        toast.error("Authentication failed");
      }
    });
  }, []); // eslint-disable-line

  /** Add new project to database, load in state
   * @param {{ name: String, colour: String, uid: String }} payload new project + uid of signed in user
   */
  const createProject = async ({ name, colour, uid }) => {
    try {
      const project = {
        name,
        colour,
      };

      const { id } = await addDoc(
        collection(db, "users", uid, "projects"),
        project
      );

      dispatch({
        type: "SET_PROJECT",
        payload: { id, project },
      });

      toast.success(`Created new project "${name}"`);
    } catch (error) {
      toast.error("Failed to create new project");
    }
  };

  /** Delete project and all associated timers from database and state
   * @param {{ id: String, name: String, uid: String }} payload projectId, project name, uid of signed in user
   */
  const deleteProject = async ({ id, name, uid }) => {
    try {
      const timersSnapshot = await getDocs(
        query(
          collection(db, "users", uid, "timers"),
          where("projectId", "==", id)
        )
      );

      // Delete associated timers in batches of max size allowed by Firestore
      const batches = chunk(timersSnapshot.docs, FIRESTORE_MAX_BATCH_SIZE);
      const commits = batches.map((batch) => {
        const writeBatch = createWriteBatch(db);
        batch.forEach((doc) => writeBatch.delete(doc.ref));
        return writeBatch.commit();
      });
      await Promise.all(commits);

      await deleteDoc(doc(db, "users", uid, "projects", id));

      dispatch({
        type: "DELETE_PROJECT",
        payload: { id },
      });

      toast.success(`Deleted project "${name}" and all associated timers`);
    } catch (error) {
      toast.error(
        "Failed to delete project — some timer records may have been deleted"
      );
    }
  };

  /** Update project in database and state
   * @param {{ id: String, project: Object, uid: String }} payload
   * project: updated data fields [required: name],
   * reason: "EDIT" | "ARCHIVE" | "UNARCHIVE"
   */
  const updateProject = async ({ id, project, reason, uid }) => {
    try {
      await updateDoc(doc(db, "users", uid, "projects", id), project);

      dispatch({
        type: "SET_PROJECT",
        payload: { id, project },
      });

      switch (reason) {
        case "EDIT":
          return toast.success(`Updated project ${project.name}`);
        case "ARCHIVE":
          return toast.success(`Archived project ${project.name}`);
        case "UNARCHIVE":
          return toast.success(`Unarchived project ${project.name}`);
        default:
          break;
      }
    } catch (error) {
      toast.error("Failed to update project");
    }
  };

  /** Add new tag to database, load in state
   * @param {{ name: String uid: String }} payload new tag + uid of signed in user
   */
  const createTag = async ({ name, uid }) => {
    try {
      const tag = { name };

      const { id } = await addDoc(collection(db, "users", uid, "tags"), tag);

      dispatch({
        type: "SET_TAG",
        payload: { id, tag },
      });

      toast.success(`Created new tag "${name}"`);
    } catch (error) {
      toast.error("Failed to create new tag");
    }
  };

  /** Delete tag and remove from all associated timers in database and state
   * @param {{ id: String, name: String, uid: String }} payload tagId, tag name, uid of signed in user
   */
  const deleteTag = async ({ id, name, uid }) => {
    try {
      const timersSnapshot = await getDocs(
        query(
          collection(db, "users", uid, "timers"),
          where("tags", "array-contains", id)
        )
      );

      // Delete associated timers in batches of max size allowed by Firestore
      const batches = chunk(timersSnapshot.docs, FIRESTORE_MAX_BATCH_SIZE);
      const commits = batches.map((batch) => {
        const writeBatch = createWriteBatch(db);
        batch.forEach((doc) =>
          writeBatch.update(doc.ref, { tags: arrayRemove(id) })
        );
        return writeBatch.commit();
      });
      await Promise.all(commits);

      await deleteDoc(doc(db, "users", uid, "tags", id));

      dispatch({
        type: "DELETE_TAG",
        payload: { id },
      });

      toast.success(
        `Deleted tag "${name}" and removed from all associated timers`
      );
    } catch (error) {
      toast.error(
        "Failed to delete tag — some timer records may have been updated"
      );
    }
  };

  /** Update tag in database and state
   * @param {{ id: String, name: String, uid: String }} payload tagId, new tag name, uid of signed-in user
   */
  const updateTag = async ({ id, name, uid }) => {
    try {
      const tag = { name };
      await updateDoc(doc(db, "users", uid, "tags", id), tag);

      dispatch({
        type: "SET_TAG",
        payload: { id, tag },
      });

      return toast.success(`Updated tag "${name}"`);
    } catch (error) {
      toast.error("Failed to update tag");
    }
  };

  /** Create activeTimer in state
   * @param {{ projectId: String }} payload projectId of project associated with timer
   */
  const createTimer = ({ projectId }) => {
    const payload = {
      createdAt: Timestamp.now(),
      projectId,
    };
    dispatch({
      type: "CREATE_TIMER",
      payload,
    });
  };

  /** Delete timer record from database and state
   * @param {{ id: String, uid: String }} payload timerId, uid of signed in user
   */
  const deleteTimer = async ({ id, uid }) => {
    try {
      await deleteDoc(doc(db, "users", uid, "timers", id));

      dispatch({
        type: "DELETE_TIMER",
        payload: { id },
      });

      toast.success("Deleted timer record");
    } catch (error) {
      toast.error("Failed to delete timer record");
    }
  };

  /** Remove activeTimer from state and write to database
   * @param {{ createdAt: Timestamp, projectId: String, uid: String }} payload activeTimer info + uid of signed in user
   */
  const stopTimer = async ({ createdAt, projectId, uid }) => {
    try {
      dispatch({
        type: "SET_TIMER_LOADING",
        payload: { createdAt, loading: true },
      });

      const timer = {
        createdAt,
        endedAt: Timestamp.now(),
        projectId,
      };
      const docRef = await addDoc(
        collection(db, "users", uid, "timers"),
        timer
      );

      dispatch({
        type: "STOP_TIMER",
        payload: {
          ...timer,
          id: docRef.id,
        },
      });
      toast.success("Created new timer record");
    } catch (error) {
      toast.error("Failed to create new timer record");
      dispatch({
        type: "SET_TIMER_LOADING",
        payload: { createdAt, loading: false },
      });
    }
  };

  /** Update timer in database and state
   * @param {{ id: String, timer: Object, uid: String }} payload
   * timer: updated data fields,
   * reason: "DESC" | "TAGS"
   */
  const updateTimer = async ({ id, timer, reason, uid }) => {
    try {
      await updateDoc(doc(db, "users", uid, "timers", id), timer);

      dispatch({
        type: "SET_TIMER",
        payload: { id, timer },
      });

      switch (reason) {
        case "DESC":
          return toast.success("Updated timer record description");
        case "TAGS":
          return toast.success("Updated timer record tags");
        default:
          break;
      }
    } catch (error) {
      toast.error("Failed to update timer record");
    }
  };

  /** Prompt for Google sign-in, fetch data from Firestore database
   */
  const signIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (error) {
      toast.error("Failed to sign in");
    }
  };

  /** Sign-out using Firebase Authentication
   */
  const signOut = async () => {
    try {
      await auth.signOut();
      toast.success("Signed out");
    } catch (error) {
      toast.error("Failed to sign out");
    }
  };

  return (
    <GlobalContext.Provider
      value={{
        ...state,
        createProject,
        deleteProject,
        updateProject,
        createTag,
        deleteTag,
        updateTag,
        createTimer,
        deleteTimer,
        stopTimer,
        updateTimer,
        signIn,
        signOut,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
