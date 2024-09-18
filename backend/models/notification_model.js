import mongoose from "mongoose";


const notificationSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true },  // Reference to the user receiving the notification
    type: { 
        type: String, 
        enum: ['request_approved', 'request_rejected', 'reminder'], 
        required: true }, // Type of notification
    message: { 
        type: String, 
        required: true },  // Notification message
    isRead: { 
        type: Boolean, 
        default: false },  // Whether the notification has been read
    createdAt: { 
        type: Date, 
        default: Date.now }
  });

  export const Notification=mongoose.model('Notification', notificationSchema)