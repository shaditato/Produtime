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
        tags: action.payload.tags ?? {},
        timers: action.payload.timers ?? [],
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
