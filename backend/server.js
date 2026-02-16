// // server.js
// import express from 'express';
// import cors from 'cors';
// import 'dotenv/config';
// import { connectDB } from './config/db.js';
// import path from 'path';
// import { fileURLToPath } from 'url';

// import userRouter from './routes/userRoute.js';
// import cartRouter from './routes/cartRoute.js';
// import itemRouter from './routes/itemRoute.js';
// import orderRouter from './routes/orderRoute.js';
// import notifiRoutes from "./routes/NotifiRoutes.js";

// const app = express();
// const port = process.env.PORT || 4000;

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // CONNECT DB
// connectDB();

// // MIDDLEWARE
// app.use(cors({
//   origin: (origin, callback) => {
//     // allow the dev servers or requests with no origin (like Postman)
//     const allowed = ['http://localhost:5173', 'http://localhost:5174'];
//     if (!origin || allowed.includes(origin)) callback(null, true);
//     else callback(new Error('Not allowed by CORS'));
//   },
//   credentials: true,
// }));

// // Body parsers must come BEFORE routes
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Routes (mount after body parsers)
// app.use('/api/users', userRouter);
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// app.use('/api/cart', cartRouter);
// app.use('/api/items', itemRouter);
// app.use('/api/orders', orderRouter);
// app.use("/api/notifications", notifiRoutes);

// app.get('/', (req, res) => res.send('API WORKING'));

// app.listen(port, () => {
//   console.log(`Server Started on http://localhost:${port}`);
// });


// server.js
// import express from 'express';
// import cors from 'cors';
// import 'dotenv/config';
// import { connectDB } from './config/db.js';
// import path from 'path';
// import { fileURLToPath } from 'url';
// import http from 'http';
// import jwt from 'jsonwebtoken';
// import { Server as IOServer } from 'socket.io';

// import userRouter from './routes/userRoute.js';
// import cartRouter from './routes/cartRoute.js';
// import itemRouter from './routes/itemRoute.js';
// import orderRouter from './routes/orderRoute.js';
// import notifiRoutes from "./routes/NotifiRoutes.js";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// // const trackingRoutes = require('./routes/trackingRoutes'); 
// const app = express();

// /**
//  * Allowed origins for CORS and Socket.IO.
//  */
// const allowedOrigins = [
//   'http://localhost:5173',
//   'http://localhost:5174',
//   process.env.CLIENT_URL
// ].filter(Boolean);

// // Create HTTP + Socket.IO server
// const server = http.createServer(app);
// const io = new IOServer(server, {
//   cors: {
//     origin: allowedOrigins,
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     credentials: true
//   }
// });

// /**
//  * Socket auth middleware
//  */
// io.use((socket, next) => {
//   try {
//     const token = socket.handshake.auth?.token || socket.handshake.query?.token;
//     if (token) {
//       const raw = token.startsWith('Bearer ') ? token.split(' ')[1] : token;
//       const payload = jwt.verify(raw, process.env.JWT_SECRET);
//       socket.userId = payload.id || payload.userId;
//       return next();
//     }

//     const userId = socket.handshake.query?.userId;
//     if (userId) {
//       socket.userId = userId; // DEV fallback
//       return next();
//     }

//     return next();
//   } catch (err) {
//     console.log('Socket auth error:', err.message);
//     return next();
//   }
// });

// /**
//  * Handle connections
//  */
// io.on('connection', (socket) => {
//   if (socket.userId) {
//     const userRoom = String(socket.userId);
//     socket.join(userRoom);
    
//     // UPDATED LOGS FOR BETTER DEBUGGING
//     console.log(`✅ Socket connected: ${socket.id}`);
//     console.log(`User ${socket.userId} has joined room: "${userRoom}"`);

//   } else {
//     console.log('Socket connected (no userId):', socket.id);
//   }

//   socket.on('disconnect', () => {
//     console.log(`❌ Socket disconnected: ${socket.id}`);
//   });
// });

// // Make io accessible inside express
// app.set('io', io);
// app.use((req, res, next) => {
//   req.io = io;
//   next();
// });

// // Connect DB
// connectDB();

// // Middlewares
// app.use(cors({
//   origin: (origin, callback) => {
//     if (!origin || allowedOrigins.includes(origin)) callback(null, true);
//     else callback(new Error('Not allowed by CORS'));
//   },
//   credentials: true
// }));
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Routes
// // app.use('/api/v1', trackingRoutes);
// app.use('/api/users', userRouter);
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// app.use('/api/cart', cartRouter);
// app.use('/api/items', itemRouter);
// app.use('/api/orders', orderRouter);
// app.use('/api/notifications', notifiRoutes);

// app.get('/', (req, res) => res.send('API WORKING'));

// // Start server
// const port = process.env.PORT || 4000;
// server.listen(port, () => {
//   console.log(`✅ Server Started on http://localhost:${port}`);
// });

import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { connectDB } from './config/db.js';
import path from 'path';
import { fileURLToPath } from 'url';
import http from 'http';
import jwt from 'jsonwebtoken';
import { Server as IOServer } from 'socket.io';

import authRoutes from './routes/auth.js';
import userRouter from './routes/userRoute.js';
import cartRouter from './routes/cartRoute.js';
import itemRouter from './routes/itemRoute.js';
import orderRouter from './routes/orderRoute.js';
import notifiRoutes from "./routes/NotifiRoutes.js";
import visitorRouter from './routes/TrackingRoute.js'; // NEW: Import the visitor router
// import singleItemRouter from './routes/singleItemRouter.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

/**
 * Allowed origins for CORS and Socket.IO.
 */
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  'http://localhost:3000',
  process.env.CLIENT_URL
].filter(Boolean);

// Create HTTP + Socket.IO server
const server = http.createServer(app);
const io = new IOServer(server, {
  cors: {
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
  }
});

/**
 * Socket auth middleware
 */
io.use((socket, next) => {
  try {
    const token = socket.handshake.auth?.token || socket.handshake.query?.token;
    if (token) {
      const raw = token.startsWith('Bearer ') ? token.split(' ')[1] : token;
      const payload = jwt.verify(raw, process.env.JWT_SECRET);
      socket.userId = payload.id || payload.userId;
      return next();
    }

    const userId = socket.handshake.query?.userId;
    if (userId) {
      socket.userId = userId; // DEV fallback
      return next();
    }

    return next();
  } catch (err) {
    console.log('Socket auth error:', err.message);
    return next();
  }
});

/**
 * Handle connections
 */
io.on('connection', (socket) => {
  if (socket.userId) {
    const userRoom = String(socket.userId);
    socket.join(userRoom);
    
    // UPDATED LOGS FOR BETTER DEBUGGING
    console.log(`✅ Socket connected: ${socket.id}`);
    console.log(`User ${socket.userId} has joined room: "${userRoom}"`);

  } else {
    console.log('Socket connected (no userId):', socket.id);
  }

  socket.on('disconnect', () => {
    console.log(`❌ Socket disconnected: ${socket.id}`);
  });
});

// Make io accessible inside express
app.set('io', io);
app.use((req, res, next) => {
  req.io = io;
  console.log("🔹 Incoming request:", req.method, req.path);
  next();
});

// Connect DB
connectDB();

// Middlewares
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) callback(null, true);
    else callback(new Error('Not allowed by CORS'));
  },
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', visitorRouter); // NEW: Add the visitor tracking route
app.use('/api/users', userRouter);

console.log("✅ User routes mounted at /api/users");

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/cart', cartRouter);
app.use('/api/items', itemRouter);
// app.use('/api/items', singleItemRouter); 
app.use('/api/orders', orderRouter);
app.use('/api/notifications', notifiRoutes);
app.use('/api/auth', authRoutes);
app.get('/', (req, res) => res.send('API WORKING'));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Start server
const port = process.env.PORT || 4000;
server.listen(port, () => {
console.log(`✅ Server Started on port ${port}`);
});