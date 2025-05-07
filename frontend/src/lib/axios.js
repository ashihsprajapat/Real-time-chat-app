

import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: import.meta.env.MODE === "development" ? "https://real-time-chat-i3umyxzdc-ashish-prajapats-projects.vercel.app/" : "https://real-time-chat-i3umyxzdc-ashish-prajapats-projects.vercel.app/",
    withCredentials: true,
})
