import express from "express"
import { countNotification, declineRequestNotification, getNotifications, markNotificationAsRead, pendingRequestsReminder, profileUpdateNotification, returnReminder } from "../controller/notification_controller.js"



const router=express.Router()
router.get('/count/:userId', countNotification);
router.get('/get/:userId', getNotifications);
router.get('/unread/:userId',markNotificationAsRead)
router.post('/notifications/approve/:userId/:itemName', async (req, res) => {
    const { userId, itemName } = req.params;
    try {
      await approveRequestNotification(userId, itemName);
      res.status(200).json({ message: `Notification sent for approving ${itemName}` });
    } catch (error) {
      res.status(500).json({ error: 'Failed to send approval notification' });
    }
})

router.post('/notifications/decline/:userId/:itemName', async (req, res) => {
    const { userId, itemName } = req.params;
    try {
      await declineRequestNotification(userId, itemName);
      res.status(200).json({ message: `Notification sent for declining ${itemName}` });
    } catch (error) {
      res.status(500).json({ error: 'Failed to send decline notification' });
    }
  });
  
  // Route to manually trigger profile update notification
  router.post('/notifications/profile-update/:userId', async (req, res) => {
    const { userId } = req.params;
    try {
      await profileUpdateNotification(userId);
      res.status(200).json({ message: 'Profile update notification sent' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to send profile update notification' });
    }
  });
  
  // Route to manually trigger pending requests reminder
  router.post('/notifications/pending-requests/:userId', async (req, res) => {
    const { userId } = req.params;
    try {
      await pendingRequestsReminder(userId);
      res.status(200).json({ message: 'Pending requests reminder sent' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to send pending requests reminder' });
    }
  });
  
  // Route to manually trigger return item reminder
  router.post('/notifications/return-reminder/:userId/:itemName', async (req, res) => {
    const { userId, itemName } = req.params;
    try {
      await returnReminder(userId, itemName);
      res.status(200).json({ message: `Return reminder sent for item ${itemName}` });
    } catch (error) {
      res.status(500).json({ error: 'Failed to send return reminder' });
    }
  });
  
  export default router;