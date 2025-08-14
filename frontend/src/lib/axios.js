

import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_MODE === "development" ? "http://localhost:8080/api" : "https://real-time-chat-app-wheat-five.vercel.app",
    withCredentials: true,
})