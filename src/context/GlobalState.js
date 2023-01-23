import { createContext, useEffect, useReducer } from "react";
import {
  Timestamp,
  addDoc,
  collection,
  doc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import { AppReducer } from "./AppReducer";
import { auth, db } from "../firebase/config";

const initialState = {
  activeTimers: [],
  user: auth.currentUser,
  projects: {},
  timers: [],
};

export const GlobalContext = createContext(initialState);

export function GlobalProvider({ children }) {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  // Update user in state when Firebase updates auth
  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      try {
        // Clear state on sign-out
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
        const timersSnapshot = await getDocs(
          collection(db, "users", user.uid, "timers")
        );
        const projects = projectsSnapshot.docs.reduce((projects, doc) => {
          return {
            ...projects,
            [doc.id]: doc.data(),
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
          },
        });
      } catch (error) {}
    });
  }, []);

  /** Add new project to database, load in state
   * @param {{ name: String, colour: String, uid: String }} payload new project + uid of signed in user
   */
  const createProject = async ({ name, colour, uid }) => {
    try {
      const project = {
        name,
        colour,
      };

      const docRef = await addDoc(
        collection(db, "users", uid, "projects"),
        project
      );

      dispatch({
        type: "SET_PROJECT",
        payload: {
          id: docRef.id,
          project,
        },
      });
    } catch (error) {}
  };

  /** Update project in database and state
   * @param {{ id: String, name: String, colour: String, uid: String }} payload updated project + uid of signed in user
   */
  const updateProject = async ({ id, name, colour, uid }) => {
    try {
      const project = {
        name,
        colour,
      };

      await setDoc(doc(db, "users", uid, "projects", id), project);

      dispatch({
        type: "SET_PROJECT",
        payload: {
          id,
          project,
        },
      });
    } catch (error) {}
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
    } catch (error) {}
  };

  return (
    <GlobalContext.Provider
      value={{
        ...state,
        createProject,
        updateProject,
        createTimer,
        stopTimer,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
