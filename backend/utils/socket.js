import { Server } from 'socket.io';
import jwt from 'jsonwebtoken';

const initSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: process.env.FRONTEND_URL || "http://localhost:5173",
      methods: ["GET", "POST"]
    }
  });

  // --- Socket Authentication Middleware ---
  io.use((socket, next) => {
    const token = socket.handshake.auth.token;
    if (!token) return next(new Error('Auth error: No token'));

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) return next(new Error('Auth error: Invalid token'));
      socket.userId = decoded.id; // Store MongoDB User ID
      next();
    });
  });

  // --- Connection Logic ---
  io.on('connection', (socket) => {
    console.log(`✅ Real-time connected: ${socket.userId}`);

    // User joins a room named after their MongoDB ID
    socket.join(String(socket.userId));

    socket.on('disconnect', () => {
      console.log(`❌ Real-time disconnected: ${socket.userId}`);
    });
  });

  return io;
};

export default initSocket;