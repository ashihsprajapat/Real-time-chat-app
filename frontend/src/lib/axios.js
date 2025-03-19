

import axios from "axios";

export const axiosInstance = axios.create({
    baseURL:  import.meta.MODE === "developement"? "http://localhost:8080/api":"https://real-time-chat-app-1-nxe6.onrender.com",
    withCredentials: true,
})
