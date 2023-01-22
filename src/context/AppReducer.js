export function AppReducer(state, action) {
  switch (action.type) {
    case "CREATE_TIMER":
      return {
        ...state,
        activeTimers: [
          {
            createdAt: action.payload.createdAt,
            projectId: action.payload.projectId,
          },
          ...state.activeTimers,
        ],
      };
    case "SET_STATE":
      return {
        ...state,
        user: action.payload.user,
        projects: action.payload.projects ?? {},
        timers: action.payload.timers ?? [],
      };
    case "STOP_TIMER":
      return {
        ...state,
        activeTimers: state.activeTimers.filter(
          (timer) =>
            timer.createdAt.toMillis() !== action.payload.createdAt.toMillis()
        ),
        timers: [action.payload, ...state.timers],
      };
    default:
      return state;
  }
}
