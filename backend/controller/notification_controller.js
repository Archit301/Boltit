import { Notification } from "../models/notification_model.js";

// Helper function to create a notification
export const createNotification = async ({ userId, type, message }) => {
    try {
      const notification = new Notification({
        userId,
        type,
        message,
      //  status: 'unread', // Optional: track status
        date: new Date(),
      });
      await notification.save();
    //   console.log('Notification created:', notification);
    } catch (error) {
      console.error('Failed to create notification', error);
    }
  };


export const getNotifications = async (req, res) => {
    const { userId } = req.params;
    // console.log(userId)
    try {
      const notifications = await Notification.find({ userId }).sort({ createdAt: -1 });
      res.status(200).json(notifications);
    } catch (error) {
      console.error('Error fetching notifications:', error);
      res.status(500).json({ error: 'Failed to retrieve notifications' });
    }
  };

  export const markNotificationAsRead = async (req, res) => {
    const { userId } = req.params;
    // console.log(userId)
    try {
        await Notification.updateMany({ userId }, { isRead: true });
      res.status(200).json({ message: 'Notification marked as read' });
    } catch (error) {
      console.error('Error marking notification as read:', error);
      res.status(500).json({ error: 'Failed to mark notification as read' });
    }
  };
  
  


  

  export const countNotification=async(req,res,next)=>{
    const { userId } = req.params;
    try {
        const notificationCount = await Notification.countDocuments({ userId,isRead:false });
        res.status(200).json({ count: notificationCount });
    } catch (error) {
        console.error('Error fetching notification count:', error);
        res.status(500).json({ error: 'Failed to retrieve notification count' });
    }
  }
  
  // Approval notification
  export const approveRequestNotification = async (userId, itemName) => {
    const message = `Your request for ${itemName} has been approved.`;
    await createNotification({ userId, type: 'request', message });
  };
  
  // Decline notification
  export const declineRequestNotification = async (userId, itemName) => {
    const message = `Your request for ${itemName} has been declined.`;
    await createNotification({ userId, type: 'request', message });
  };
  
  // Profile update notification
  export const profileUpdateNotification = async (userId) => {
    const message = 'Your profile has been successfully updated.';
    await createNotification({ userId, type: 'profile', message });
  };
  
  // Pending requests reminder
  export const pendingRequestsReminder = async (userId) => {
    const message = 'You have pending requests that need your attention.';
    await createNotification({ userId, type: 'reminder', message });
  };
  
  // Return item reminder
  export const returnReminder = async (userId, itemName) => {
    const message = `Reminder: Item Returned check ${itemName}.`;
    await createNotification({ userId, type: 'reminder', message });
  };
  