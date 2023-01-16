import { createContext, useEffect, useReducer } from "react";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
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
    auth.onAuthStateChanged((user) => {
      console.log(user);

      dispatch({
        type: "SIGN_IN",
        payload: user,
      });
    });
  }, []);

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
        stopTimer,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
