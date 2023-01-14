export function AppReducer(state, action) {
  switch (action.type) {
    case "CREATE_TIMER":
      return {
        ...state,
        activeTimers: [
          { createdAt: Date.now(), projectId: action.payload.projectId },
          ...state.activeTimers,
        ],
      };
    case "GET_PROJECTS":
      return {
        ...state,
        projects: action.payload,
      };
    case "GET_TIMERS":
      return {
        ...state,
        timers: action.payload,
      };
    case "SIGN_IN":
      return {
        ...state,
        user: action.payload,
      };
    case "STOP_TIMER":
      return {
        ...state,
        activeTimers: state.activeTimers.filter(
          (timer) => timer.createdAt !== +action.payload.createdAt
        ),
        timers: [action.payload, ...state.timers],
      };
    default:
      return state;
  }
}
