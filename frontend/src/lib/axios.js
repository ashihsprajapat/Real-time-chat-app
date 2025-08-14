

import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_MODE === "development" ? "http://localhost:8080/api" : "https://real-time-chat-app-backend-sage.vercel.app",
    withCredentials: true,
})