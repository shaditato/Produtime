import { createContext, useEffect, useReducer } from "react";
import { Timestamp, addDoc, collection, getDocs } from "firebase/firestore";
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
        createTimer,
        stopTimer,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
