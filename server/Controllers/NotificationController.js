import Notification from '../Models/NotificationModel.js';

// Controller to create a new notification
export const createNotification = async (req, res) => {
  try {
    const { userId, message, type } = req.body;

    // Validate input
    if (!userId || !message || !type) {
      return res.status(400).json({ error: 'userId, message, and type are required' });
    }

    // Create new notification
    const newNotification = new Notification({
      userId,
      message,
      type,
    });

    await newNotification.save();
    return res.status(201).json(newNotification);
  } catch (error) {
    console.error('Error creating notification:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Controller to fetch all notifications for a user
export const getNotificationsByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    // Fetch notifications for the specified user
    const notifications = await Notification.find({ userId })
      .sort({ createdAt: -1 }) // Sort by most recent
      .exec();

    return res.status(200).json(notifications);
  } catch (error) {
    console.error('Error fetching notifications:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Controller to mark a notification as read
export const markNotificationAsRead = async (req, res) => {
  try {
    const { notificationId } = req.params;

    // Find the notification and update its read status
    const notification = await Notification.findByIdAndUpdate(
      notificationId,
      { readStatus: true, updatedAt: Date.now() },
      { new: true } // Return the updated document
    );

    if (!notification) {
      return res.status(404).json({ error: 'Notification not found' });
    }

    return res.status(200).json(notification);
  } catch (error) {
    console.error('Error marking notification as read:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Controller to delete a notification
export const deleteNotification = async (req, res) => {
  try {
    const { notificationId } = req.params;

    // Find and delete the notification
    const notification = await Notification.findByIdAndDelete(notificationId);

    if (!notification) {
      return res.status(404).json({ error: 'Notification not found' });
    }

    return res.status(200).json({ message: 'Notification deleted successfully' });
  } catch (error) {
    console.error('Error deleting notification:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Controller to get the total count of unread notifications for a user
export const getUnreadNotificationCount = async (req, res) => {
  try {
    const { userId } = req.params;

    // Count unread notifications for the user
    const unreadCount = await Notification.countDocuments({ userId, readStatus: false });

    return res.status(200).json({ unreadCount });
  } catch (error) {
    console.error('Error fetching unread notification count:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Controller to update a notification
export const updateNotification = async (req, res) => {
  try {
    const { notificationId } = req.params;
    const { message } = req.body;

    // Validate input
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Find the notification and update its message
    const notification = await Notification.findByIdAndUpdate(
      notificationId,
      { message, updatedAt: Date.now() },
      { new: true } // Return the updated document
    );

    if (!notification) {
      return res.status(404).json({ error: 'Notification not found' });
    }

    return res.status(200).json(notification);
  } catch (error) {
    console.error('Error updating notification:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
