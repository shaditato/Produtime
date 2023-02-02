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
} from "firebase/firestore";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useToast } from "use-toast-mui";
import { AppReducer } from "./AppReducer";
import { FIRESTORE_MAX_BATCH_SIZE } from "../data/constants";
import { auth, db } from "../firebase/config";
import { chunk } from "../utils/chunk";

const initialState = {
  activeTimers: [],
  user: null,
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
        // Ignore if signing out
        if (user === null) return;
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

  /** Remove activeTimer from state and write to database
   * @param {{ createdAt: Timestamp, projectId: String, uid: String }} payload activeTimer info + uid of signed in user
   */
  const stopTimer = async ({ createdAt, projectId, uid }) => {
    try {
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

  /** Sign-out and clear state
   */
  const signOut = async () => {
    try {
      await auth.signOut();
      dispatch({
        type: "SET_STATE",
        payload: { user: null },
      });
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
        createTimer,
        stopTimer,
        signIn,
        signOut,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
