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
    case "DELETE_PROJECT":
      const { [action.payload.id]: _, ...rest } = state.projects;
      return {
        ...state,
        activeTimers: state.activeTimers.filter(
          (timer) => timer.projectId !== action.payload.id
        ),
        projects: rest,
        timers: state.timers.filter(
          (timer) => timer.projectId !== action.payload.id
        ),
      };
    case "DELETE_TAG":
      const { [action.payload.id]: _tag, ...restTags } = state.tags;
      return {
        ...state,
        tags: restTags,
        timers: state.timers.map((timer) => {
          return {
            ...timer,
            ...(timer.tags
              ? { tags: timer.tags.filter((id) => id !== action.payload.id) }
              : {}),
          };
        }),
      };
    case "SET_STATE":
      return {
        ...state,
        user: action.payload.user,
        projects: action.payload.projects ?? {},
        tags: action.payload.tags ?? {},
        timers: action.payload.timers ?? [],
      };
    case "SET_TAG":
      return {
        ...state,
        tags: {
          ...state.tags,
          [action.payload.id]: action.payload.tag.name,
        },
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
          [action.payload.id]: {
            ...(state.projects[action.payload.id] ?? {}),
            ...action.payload.project,
          },
        },
      };
    default:
      return state;
  }
}
