import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNotifications, createNotification, updateNotification, markNotificationAsRead, deleteNotification, getUnreadNotificationCount } from "../actions/NotificationAction";

const Notification = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authReducer.authData);
  const adminUserId = "6757eeeabacab91a5683007c"; // Fixed admin user ID
  const currentUserId = user._id;

  const [newMessage, setNewMessage] = useState("");
  const [notificationType, setNotificationType] = useState("");
  const [updatedMessage, setUpdatedMessage] = useState("");

  const notifications = useSelector((state) => state.notificationReducer.notifications);
  const unreadCount = useSelector((state) => state.notificationReducer.unreadCount);

  useEffect(() => {
    // Fetch notifications for the current user or admin
    dispatch(getNotifications(currentUserId));
    dispatch(getUnreadNotificationCount(currentUserId));
  }, [dispatch, currentUserId]);

  const handleCreateNotification = () => {
    if (newMessage && notificationType) {
      dispatch(createNotification(currentUserId, newMessage, notificationType));
      setNewMessage("");
      setNotificationType("");
    } else {
      console.error("Message and type are required to create a notification");
    }
  };

  const handleUpdateNotification = (notificationId) => {
    if (updatedMessage) {
      dispatch(updateNotification(notificationId, updatedMessage));
      setUpdatedMessage("");
    } else {
      console.error("Updated message is required");
    }
  };

  const handleMarkAsRead = (notificationId) => {
    dispatch(markNotificationAsRead(notificationId));
  };

  const handleDeleteNotification = (notificationId) => {
    dispatch(deleteNotification(notificationId));
  };

  return (
    <div className="notification-container">
      <h2>Notifications</h2>

      {/* Unread Notifications Count */}
      <div className="unread-count">
        <h3>Unread Notifications: {unreadCount}</h3>
      </div>

      {/* Notification Creation Form (Admin or User) */}
      {currentUserId === adminUserId && (
        <div className="create-notification-form">
          <input
            type="text"
            placeholder="Enter notification message"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <select
            value={notificationType}
            onChange={(e) => setNotificationType(e.target.value)}
          >
            <option value="">Select Type</option>
            <option value="info">Info</option>
            <option value="warning">Warning</option>
            <option value="error">Error</option>
          </select>
          <button onClick={handleCreateNotification}>Create Notification</button>
        </div>
      )}

      {/* Display Notifications */}
      <div className="notification-list">
        {notifications && notifications.length > 0 ? (
          notifications.map((notification) => (
            <div key={notification._id} className="notification-item">
              <p>{notification.message}</p>
              <p>Type: {notification.type}</p>
              <p>Status: {notification.read ? "Read" : "Unread"}</p>

              {/* Admin Actions */}
              {currentUserId === adminUserId && (
                <div className="admin-actions">
                  <button onClick={() => handleUpdateNotification(notification._id)}>
                    Update
                  </button>
                  <button onClick={() => handleDeleteNotification(notification._id)}>
                    Delete
                  </button>
                </div>
              )}

              {/* Mark as Read (for user) */}
              {currentUserId !== adminUserId && !notification.read && (
                <button onClick={() => handleMarkAsRead(notification._id)}>
                  Mark as Read
                </button>
              )}
            </div>
          ))
        ) : (
          <p>No notifications available.</p>
        )}
      </div>
    </div>
  );
};

export default Notification;
