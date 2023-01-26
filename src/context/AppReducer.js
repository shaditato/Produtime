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
    case "SIGN_IN":
      return {
        ...state,
        user: action.payload.user,
        projects: action.payload.projects ?? {},
        timers: action.payload.timers ?? [],
      };
    case "SIGN_OUT":
      return {
        activeTimers: [],
        user: null,
        projects: {},
        timers: [],
      };
    case "STOP_TIMER":
      return {
        ...state,
        activeTimers: state.activeTimers.filter(
          (timer) => !timer.createdAt.isEqual(action.payload.createdAt)
        ),
        timers: [action.payload, ...state.timers],
      };
    case "SET_PROJECT":
      return {
        ...state,
        projects: {
          ...state.projects,
          [action.payload.id]: action.payload.project,
        },
      };
    default:
      return state;
  }
}
