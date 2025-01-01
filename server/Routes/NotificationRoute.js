import express from 'express';
import * as NotificationController from '../Controllers/NotificationController.js';

const router = express.Router();

// Create a new notification
router.post('/', NotificationController.createNotification);

// Get all notifications for a user
router.get('/:userId', NotificationController.getNotificationsByUser);

// Mark notification as read
router.patch('/:notificationId/read', NotificationController.markNotificationAsRead);

// Delete a notification
router.delete('/:notificationId', NotificationController.deleteNotification);

// Get unread notifications count for a user
router.get('/:userId/unread-count', NotificationController.getUnreadNotificationCount);

// Update an existing notification
router.put('/:notificationId', NotificationController.updateNotification);

export default router;
