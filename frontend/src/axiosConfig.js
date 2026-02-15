// src/api/axiosConfig.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4000/api", // backend base URL
  withCredentials: true,                // allow cookies if needed
});

export default api;
