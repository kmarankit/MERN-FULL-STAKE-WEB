// backend/routes/NotifiRoutes.js
import express from "express";
import Notification from "../modals/NotifiSchema.js";
import mongoose from "mongoose"; // ✅ Import Mongoose to use ObjectId

const router = express.Router();

// Get all notifications for a user
router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    // ✅ Corrected: Query for the "user" field, not "userId"
    const notifications = await Notification.find({
      user: new mongoose.Types.ObjectId(userId)
    }).sort({ createdAt: -1 });

    console.log("Notifications found:", notifications);

    res.json(notifications);
  } catch (err) {
    console.error("Fetch notifications error:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});


// Create a notification (example)
router.post("/", async (req, res) => {
  try {
    // Corrected: The new notification is stored in 'notif'
    const notif = new Notification(req.body); 
    await notif.save();

    // Corrected: Use 'req.io', 'notif.user', and the 'notif' object.
    // Ensure the event name 'newNotification' matches the frontend.
    const userRoom = String(notif.user);
    console.log(`📡 Attempting to emit 'newNotification' to room: "${userRoom}"`);
    req.io.to(userRoom).emit("newNotification", notif);

    res.status(201).json(notif);
  } catch (err) {
    console.error("Create notification error:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});


export default router;