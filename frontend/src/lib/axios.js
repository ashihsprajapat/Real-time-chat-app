

import axios from "axios";

export const axiosInstance = axios.create({
    baseURL:  import.meta.MODE === "developement"? "http://localhost:8080/api":"/api",
    withCredentials: true,
})