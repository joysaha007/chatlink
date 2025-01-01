const initialState = {
    notifications: [], // Array to store notifications
    loading: false, // Loading state for fetching notifications
    error: false, // Error state
    creating: false, // State for creating notifications

  };

  
  const notificationReducer = (state = initialState, action) => {
    switch (action.type) {
      // Actions for creating a notification
      case "CREATE_NOTIFICATION_START":
        return { ...state, creating: true, error: false };
      case "CREATE_NOTIFICATION_SUCCESS":
        return {
          ...state,
          notifications: [action.data, ...state.notifications], // Add new notification to the list
          creating: false,
          error: false,
        };
      case "CREATE_NOTIFICATION_FAIL":
        return { ...state, creating: false, error: true };
  
      // Actions for retrieving notifications
      case "GET_NOTIFICATIONS_START":
        return { ...state, loading: true, error: false };
      case "GET_NOTIFICATIONS_SUCCESS":
        return {
          ...state,
          notifications: action.data || [], // Ensure notifications defaults to an empty array if action.data is undefined
          loading: false,
          error: false,
        };
      case "GET_NOTIFICATIONS_FAIL":
        return { ...state, loading: false, error: true };
  
      // Actions for marking a notification as read
      case "MARK_NOTIFICATION_AS_READ":
        return {
          ...state,
          notifications: state.notifications.map((notification) =>
            notification._id === action.id
              ? { ...notification, read: true } // Mark notification as read
              : notification
          ),
        };
  
      // Actions for deleting a notification
      case "DELETE_NOTIFICATION":
        return {
          ...state,
          notifications: state.notifications.filter(
            (notification) => notification._id !== action.id // Remove notification by id
          ),
        };
  
      default:
        return state;
    }
  };
  
  export default notificationReducer;
  