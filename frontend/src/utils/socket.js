// src/utils/socket.js (Correct Code)

import { io } from "socket.io-client";
import { API_BASE_URL } from "../config/api";

const token = localStorage.getItem("authToken");

export const socket = io(API_BASE_URL, {
  autoConnect: false,
  auth: {
    token: token,
  },
});
