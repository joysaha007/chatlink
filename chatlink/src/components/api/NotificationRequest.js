import axios from "axios";

// Create an axios instance with a base URL
const API = axios.create({ baseURL: "http://localhost:5000" });


// Get all notifications for a user
export const getNotifications = (userId) => API.get(`/notification/${userId}`);

// Create a new notification
export const createNotification = (userId, message, type) =>
  API.post(`/notifications`, { userId, message, type });

// Mark notification as read
export const markNotificationAsRead = (notificationId) =>
  API.patch(`/notifications/${notificationId}/read`);

// Delete a notification
export const deleteNotification = (notificationId) =>
  API.delete(`/notifications/${notificationId}`);

// Get unread notifications count for a user
export const getUnreadNotificationCount = (userId) =>
  API.get(`/notifications/${userId}/unread-count`);

// Update an existing notification
export const updateNotification = (notificationId, updatedMessage) =>
  API.put(`/notifications/${notificationId}`, { message: updatedMessage });


export default API;
