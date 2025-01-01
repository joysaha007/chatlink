const postReducer = (
  state = { posts: [], loading: false, error: false, uploading: false },
  action
) => {
  switch (action.type) {
    // Actions for PostShare.jsx
    case "UPLOAD_START":
      return { ...state, error: false, uploading: true };
    case "UPLOAD_SUCCESS":
      return {
        ...state,
        posts: [action.data, ...(state.posts || [])], // Ensure posts is always an array
        uploading: false,
        error: false,
      };
    case "UPLOAD_FAIL":
      return { ...state, uploading: false, error: true };

    // Actions for Posts.jsx
    case "RETREIVING_START":
      return { ...state, loading: true, error: false };
    case "RETREIVING_SUCCESS":
      return {
        ...state,
        posts: action.data || [], // Ensure posts defaults to an empty array if action.data is undefined
        loading: false,
        error: false,
      };
    case "RETREIVING_FAIL":
      return { ...state, loading: false, error: true };

    default:
      return state;
  }
};

export default postReducer;
