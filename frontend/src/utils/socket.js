// src/utils/socket.js (Correct Code)

import { io } from "socket.io-client";

const token = localStorage.getItem("token");

// The URL is removed to allow the proxy to work.
// It will connect to the same host that the webpage is on (localhost:5173),
// and the Vite proxy will forward it to the backend (localhost:4000).
export const socket = io({ 
  autoConnect: false,
  auth: {
    token: token,
  },
});