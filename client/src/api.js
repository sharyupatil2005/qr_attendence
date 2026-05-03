// import axios from 'axios';
// import { getDeviceId } from './utils/deviceUtils'; 

// const API = axios.create({ 
//   // 🚀 DEPLOYMENT FIX: 
//   // If running on Vercel, it uses the VITE_API_URL (Render URL).
//   // If running locally, it defaults to localhost:5000.
//   baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  
//   headers: {
//     "ngrok-skip-browser-warning": "true"
//   }
// });

// // Interceptor to attach Token AND Device ID to every request
// API.interceptors.request.use((req) => {
//   // 1. Attach JWT Token for Authentication
//   const token = localStorage.getItem('token');
//   if (token) {
//     req.headers.Authorization = `Bearer ${token}`;
//   }

//   // 2. 🔒 Attach Device ID for Security Binding
//   const deviceId = getDeviceId();
//   if (deviceId) {
//     req.headers['x-device-id'] = deviceId;
//   }

//   return req;
// }, (error) => {
//   return Promise.reject(error);
// });

// export default API;

import axios from "axios";
import { getDeviceId } from "./utils/deviceUtils";

// 🔥 FIXED BASE URL HANDLING
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL
    ? import.meta.env.VITE_API_URL
    : "https://qr-attendence-gnxv.onrender.com",

  headers: {
    "Content-Type": "application/json",
    "ngrok-skip-browser-warning": "true"
  }
});

// 🔐 Interceptor (unchanged logic, just safer headers)
API.interceptors.request.use(
  (req) => {
    // JWT Token
    const token = localStorage.getItem("token");
    if (token) {
      req.headers.Authorization = `Bearer ${token}`;
    }

    // Device ID
    const deviceId = getDeviceId();
    if (deviceId) {
      req.headers["x-device-id"] = deviceId;
    }

    return req;
  },
  (error) => Promise.reject(error)
);

export default API;