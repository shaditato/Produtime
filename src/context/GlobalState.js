import { createContext, useReducer } from "react";
import { AppReducer } from "./AppReducer";

const initialState = {
  activeTimers: [],
  user: undefined,
  projects: [
    // temporary before Firestore integration
    { name: "Mathematics", colour: "#ff99bb" },
    { name: "Science", colour: "#c7f7d4" },
    { name: "Programming", colour: "#a3b1ff" },
  ],
};

export const GlobalContext = createContext(initialState);

export function GlobalProvider({ children }) {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  const createTimer = (payload) => {
    dispatch({
      type: "CREATE_TIMER",
      payload,
    });
  };

  const stopTimer = (payload) => {
    dispatch({
      type: "STOP_TIMER",
      payload,
    });
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
