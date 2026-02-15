// Import necessary modules
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import jwt from 'jsonwebtoken'; // <-- NEW: For handling JWTs
import 'dotenv/config';       // <-- NEW: To load environment variables

// Create an Express app and an HTTP server
const app = express();
const server = http.createServer(app);
app.use(express.json());

// Initialize Socket.IO with CORS enabled
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PATCH", "PUT"]
  }
});

// --- (Mock databases remain the same) ---
const mockNotifications = [/* ...your mock data... */];
const mockOrders = [/* ...your mock data... */];


// --- NEW: Middleware to protect API routes ---
const protectRoute = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (token == null) return res.sendStatus(401); // if there isn't any token

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403); // if token is no longer valid
    req.user = user;
    next();
  });
};


// --- API Endpoints (Now protected) ---

// Get notifications for the LOGGED-IN user
app.get('/api/notifications/:userId', protectRoute, (req, res) => {
  // We can validate that the requestor is the owner of the notifications
  if (req.user.id !== req.params.userId) {
      return res.status(403).json({ message: "Forbidden: You can only access your own notifications." });
  }
  const userNotifications = mockNotifications.filter(notif => notif.userId === req.params.userId);
  res.json(userNotifications);
});

// Mark a notification as read
app.patch('/api/notifications/:id', protectRoute, (req, res) => {
  const { id } = req.params;
  const notification = mockNotifications.find(notif => notif._id === id);
  
  if (notification) {
    // Optional: Check if the user owns this notification
    if (req.user.id !== notification.userId) {
      return res.status(403).json({ message: "Forbidden: You cannot modify this notification." });
    }
    notification.isRead = true;
    res.status(200).json({ message: 'Notification marked as read.' });
  } else {
    res.status(404).json({ message: 'Notification not found.' });
  }
});

// Update an order status and send a real-time notification
// Update an order status and send a real-time notification
app.put('/api/orders/:orderId/status', (req, res) => { // This could also be a protected route
  const { orderId } = req.params;
  const { status } = req.body; // e.g., status = "outForDelivery"
  // const order = mockOrders.find(o => o.orderId === orderId);

  if (order) {
    order.status = status;
    const notificationMessage = `Your order status has been updated to: ${status}.`;
    
    // Create the notification WITH the dynamic type
    const newNotification = {
      _id: `notif-${Date.now()}`,
      userId: order.userId,
      message: notificationMessage,
      isRead: false,
      createdAt: new Date().toISOString(),
      type: status // The type will now be "outForDelivery", "Delivered", etc.
    };
    mockNotifications.push(newNotification);

    // Emit the notification to the specific user's room
        console.log('‼️ SERVER IS ABOUT TO EMIT THIS OBJECT:', newNotification);
    io.to(order.userId).emit('newNotification', newNotification);
    
    // Log for debugging on the server
    console.log('New Notification Sent:', newNotification);
    
    res.status(200).json({ message: 'Order status updated and notification sent.' });
  } else {
    res.status(404).json({ message: 'Order not found.' });
  }
});


// --- NEW: Socket.IO Authentication Middleware ---
io.use((socket, next) => {
  const token = socket.handshake.auth.token;
  if (!token) {
    return next(new Error('Authentication error: No token provided.'));
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return next(new Error('Authentication error: Invalid token.'));
    }
    socket.userId = decoded.id; // Attach userId to the socket object
    next();
  });
});


// --- UPDATED: Socket.IO connection logic ---
io.on('connection', (socket) => {
  console.log(`✅ User connected with ID: ${socket.userId}`);

  // Automatically join the user to a room named after their ID
  socket.join(socket.userId);
  console.log(`User ${socket.userId} automatically joined room: ${socket.userId}`);

  // The old 'joinRoom' listener has been removed.

  socket.on('disconnect', () => {
    console.log(`❌ User disconnected: ${socket.userId}`);
  });
});

// --- Server Listening Logic (no changes) ---
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}`);
});