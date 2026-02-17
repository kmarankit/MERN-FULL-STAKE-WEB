// // controllers/NotifiController.js
// import Notification from "../modals/NotifiSchema.js";

// // Get all notifications
// export const getNotifications = async (req, res) => {
//   try {
//     const notifications = await Notification.find().sort({ createdAt: -1 });
//     res.json(notifications);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// // Get new notifications since last fetch
// export const getNewNotifications = async (req, res) => {
//   try {
//     const { since } = req.query;
//     const notifications = await Notification.find({
//       createdAt: { $gt: new Date(since) },
//     }).sort({ createdAt: -1 });

//     res.json(notifications);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// // Mark one as read
// export const markAsRead = async (req, res) => {
//   try {
//     const { id } = req.params;
//     await Notification.findByIdAndUpdate(id, { isRead: true });
//     res.json({ message: "Marked as read" });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// // Mark all as read
// export const markAllAsRead = async (req, res) => {
//   try {
//     await Notification.updateMany({}, { isRead: true });
//     res.json({ message: "All marked as read" });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };
// // Get notifications for specific user
// export const getUserNotifications = async (req, res) => {
//   try {
//     const { userId } = req.params;
//     const notifications = await Notification.find({ user: userId })
//       .sort({ createdAt: -1 });
//     res.json(notifications);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };


import Notification from "../modals/NotifiSchema.js";

// @desc    Get notifications for the logged-in user only
// @route   GET /api/notifications
export const getUserNotifications = async (req, res) => {
  try {
    // SECURE: Pull ID from the middleware, not the URL
    const userId = req.user.id; 

    const notifications = await Notification.find({ user: userId })
      .sort({ createdAt: -1 });
      
    res.json(notifications);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// @desc    Mark a specific notification as read (Owner only)
// @route   PUT /api/notifications/:id
export const markAsRead = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    // SECURE: Ensure the notification belongs to the user trying to update it
    const notification = await Notification.findOneAndUpdate(
      { _id: id, user: userId }, 
      { isRead: true },
      { new: true }
    );

    if (!notification) {
      return res.status(404).json({ message: "Notification not found or unauthorized" });
    }

    res.json({ message: "Marked as read" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// @desc    Mark all of the user's notifications as read
// @route   PUT /api/notifications/mark-all
export const markAllAsRead = async (req, res) => {
  try {
    const userId = req.user.id;

    await Notification.updateMany({ user: userId }, { isRead: true });
    res.json({ message: "All marked as read" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// @desc    Check for new notifications since a timestamp
export const getNewNotifications = async (req, res) => {
  try {
    const userId = req.user.id;
    const { since } = req.query;

    const notifications = await Notification.find({
      user: userId,
      createdAt: { $gt: new Date(since) },
    }).sort({ createdAt: -1 });

    res.json(notifications);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};