import { createContext, useReducer } from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { AppReducer } from "./AppReducer";
import { auth, db } from "../firebase/config";

const initialState = {
  activeTimers: [],
  user: undefined,
  projects: {},
  timers: [],
};

export const GlobalContext = createContext(initialState);

export function GlobalProvider({ children }) {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  /** Create activeTimer in state
   * @param {{ projectId: String }} payload projectId of project associated with timer
   */
  const createTimer = (payload) => {
    dispatch({
      type: "CREATE_TIMER",
      payload,
    });
  };

  /** Read projects from database and load in state
   * @param {{ uid: String }} payload uid of signed in user
   */
  const getProjects = async ({ uid }) => {
    try {
      const querySnapshot = await getDocs(
        query(collection(db, "projects"), where("uid", "==", uid))
      );
      dispatch({
        type: "GET_PROJECTS",
        payload: querySnapshot.docs.reduce((projects, doc) => {
          return {
            ...projects,
            [doc.id]: doc.data(),
          };
        }, {}),
      });
    } catch (error) {}
  };

  /** Read timers from database and load in state
   * @param {{ uid: String }} payload uid of signed in user
   */
  const getTimers = async ({ uid }) => {
    try {
      const querySnapshot = await getDocs(
        query(collection(db, "timers"), where("uid", "==", uid))
      );
      dispatch({
        type: "GET_TIMERS",
        payload: querySnapshot.docs.map((doc) => doc.data()),
      });
    } catch (error) {}
  };

  /** Prompt user for Google account sign-in and load user in state
   */
  const signIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const { user } = await signInWithPopup(auth, provider);
      dispatch({
        type: "SIGN_IN",
        payload: user,
      });
    } catch (error) {}
  };

  /** Remove activeTimer from state and write to database
   * @param {{ createdAt: Number, projectId: String, uid: String }} payload uid of signed in user
   */
  const stopTimer = async (payload) => {
    const { createdAt, projectId, uid } = payload;

    try {
      const timer = {
        createdAt,
        endedAt: Date.now(),
        projectId,
        uid,
      };

      await addDoc(collection(db, "timers"), timer);
      dispatch({
        type: "STOP_TIMER",
        payload: timer,
      });
    } catch (error) {}
  };

  return (
    <GlobalContext.Provider
      value={{
        ...state,
        createTimer,
        getProjects,
        getTimers,
        signIn,
        stopTimer,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
