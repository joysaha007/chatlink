import * as NotificationApi from "../api/NotificationRequest";

// Action to get notifications for a user
export const getNotifications = (userId) => async (dispatch) => {
  if (!userId) {
    console.error("User ID is missing");
    return; // Early return if userId is invalid
  }

  dispatch({ type: "FETCH_NOTIFICATIONS_START" });

  try {
    const { data } = await NotificationApi.getNotifications(userId);
    dispatch({ type: "FETCH_NOTIFICATIONS_SUCCESS", data: data });
  } catch (error) {
    console.error("Error fetching notifications:", error);
    dispatch({ type: "FETCH_NOTIFICATIONS_FAIL" });
  }
};

// Action to create a new notification
export const createNotification = (userId, message, type) => async (dispatch) => {
  if (!userId || !message || !type) {
    console.error("Missing required parameters for creating notification");
    return; // Early return if any required parameter is missing
  }

  dispatch({ type: "CREATE_NOTIFICATION_START" });

  try {
    const { data } = await NotificationApi.createNotification(userId, message, type);
    dispatch({ type: "CREATE_NOTIFICATION_SUCCESS", data: data });
  } catch (error) {
    console.error("Error creating notification:", error);
    dispatch({ type: "CREATE_NOTIFICATION_FAIL" });
  }
};

// Action to update an existing notification
export const updateNotification = (notificationId, updatedMessage) => async (dispatch) => {
  if (!notificationId || !updatedMessage) {
    console.error("Missing required parameters for updating notification");
    return; // Early return if any required parameter is missing
  }

  dispatch({ type: "UPDATE_NOTIFICATION_START" });

  try {
    const { data } = await NotificationApi.updateNotification(notificationId, updatedMessage);
    dispatch({ type: "UPDATE_NOTIFICATION_SUCCESS", data: data });
  } catch (error) {
    console.error("Error updating notification:", error);
    dispatch({ type: "UPDATE_NOTIFICATION_FAIL" });
  }
};

// Action to mark a notification as read
export const markNotificationAsRead = (notificationId) => async (dispatch) => {
  if (!notificationId) {
    console.error("Notification ID is missing");
    return; // Early return if notificationId is missing
  }

  dispatch({ type: "MARK_NOTIFICATION_READ_START" });

  try {
    const { data } = await NotificationApi.markNotificationAsRead(notificationId);
    dispatch({ type: "MARK_NOTIFICATION_READ_SUCCESS", data: data });
  } catch (error) {
    console.error("Error marking notification as read:", error);
    dispatch({ type: "MARK_NOTIFICATION_READ_FAIL" });
  }
};

// Action to delete a notification
export const deleteNotification = (notificationId) => async (dispatch) => {
  if (!notificationId) {
    console.error("Notification ID is missing");
    return; // Early return if notificationId is missing
  }

  dispatch({ type: "DELETE_NOTIFICATION_START" });

  try {
    const { data } = await NotificationApi.deleteNotification(notificationId);
    dispatch({ type: "DELETE_NOTIFICATION_SUCCESS", data: data });
  } catch (error) {
    console.error("Error deleting notification:", error);
    dispatch({ type: "DELETE_NOTIFICATION_FAIL" });
  }
};

// Action to get unread notification count
export const getUnreadNotificationCount = (userId) => async (dispatch) => {
  if (!userId) {
    console.error("User ID is missing");
    return; // Early return if userId is missing
  }

  dispatch({ type: "FETCH_UNREAD_NOTIFICATION_COUNT_START" });

  try {
    const { data } = await NotificationApi.getUnreadNotificationCount(userId);
    dispatch({ type: "FETCH_UNREAD_NOTIFICATION_COUNT_SUCCESS", data: data });
  } catch (error) {
    console.error("Error fetching unread notification count:", error);
    dispatch({ type: "FETCH_UNREAD_NOTIFICATION_COUNT_FAIL" });
  }
};
