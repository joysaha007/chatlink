import mongoose from 'mongoose';

// Define the Notification Schema
const notificationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Reference to the User model
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ['like', 'comment', 'follow', 'mention', 'other'], // Add more types as needed
      required: true,
    },
    readStatus: {
      type: Boolean,
      default: false, // Set to false initially (unread)
    },
    createdAt: {
      type: Date,
      default: Date.now, // Automatically set the current date/time when creating a notification
    },
    updatedAt: {
      type: Date,
      default: Date.now, // Automatically set the current date/time when creating a notification
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Create the Notification model
const Notification = mongoose.model('Notification', notificationSchema);
export default Notification;
