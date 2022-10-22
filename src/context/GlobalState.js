import { createContext, useReducer } from "react";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { AppReducer } from "./AppReducer";
import { db } from "../firebase/config";

const initialState = {
  activeTimers: [],
  user: undefined,
  projects: [],
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
        payload: querySnapshot.docs.map((doc) => {
          return { ...doc.data(), id: doc.id };
        }),
      });
    } catch (error) {}
  };

  /** Remove activeTimer from state and write to database
   * @param {{ createdAt: Number, projectId: String, uid: String }} payload uid of signed in user
   */
  const stopTimer = async (payload) => {
    const { createdAt, projectId, uid } = payload;

    try {
      await addDoc(collection(db, "timers"), {
        createdAt,
        endedAt: Date.now(),
        projectId,
        uid,
      });
      dispatch({
        type: "STOP_TIMER",
        payload,
      });
    } catch (error) {}
  };

  return (
    <GlobalContext.Provider
      value={{
        ...state,
        createTimer,
        getProjects,
        stopTimer,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
