

import { create } from 'zustand'
import { axiosInstance } from './../lib/axios.js';
import { toast } from 'react-hot-toast'
import { io } from 'socket.io-client'


const BASE_URL = import.meta.MODE !== "developement" ? "http://localhost:8080" : "/"

export const useAuthStore = create((set, get) => ({
    authUser: null,

    isSingingUp: false,

    isLogginIng: false,

    isUpdatingProfile: false,

    isCheckingAuth: true,

    onlineUsers: [],

    socket: null,

    chekAuth: async () => {
        try {
            const token_chat_app = localStorage.getItem("token_chat_app");
            const result = await axiosInstance.get("/auth/check", { headers: { token: token_chat_app } });
            console.log(result)
            if (result.data.success) {
                set({ authUser: result.data.user })
                get().connectSocket();
            }

        } catch (err) {
            console.log("err is", err)


        } finally {
            set({ isCheckingAuth: false, })
        }

    },

    SignInFun: async (data) => {

        set({ isSingingUp: true });
        try {

            const result = await axiosInstance.post("/auth/register", data);

            if (result.data.success) {
                toast.success("register successfull")
                set({ authUser: result.data })
                localStorage.setItem("token_chat_app", result.data.token)
                get().connectSocket();
            }


        } catch (err) {
            console.log(err);
            toast.error(err.response.data.message);

        } finally {
            set({ isSingingUp: false })
        }

    },

    logOut: async () => {
        try {

            localStorage.removeItem("token_chat_app")

            set({ authUser: null });
            toast.success("logout success")
            get().disconnectSocket();
        } catch (err) {
            console.log(err)
            //toast.error(err.response.data.message);
        } finally {
            set({ authUser: null })
        }
    },

    Login: async (userData) => {
        try {

            const result = await axiosInstance.post("/auth/login", userData);


            if (result.data.success) {
                toast.success("login successfull")
                set({ authUser: result.data })
                set({ isSingingUp: true })
                localStorage.setItem("token_chat_app", result.data.token)
                get().connectSocket();
            }

        } catch (err) {
            console.log(err)
            toast.error(err.response.data.message)

        } finally {
            set({ isLogginIng: false })
        }
    },

    updateProfile: async (data) => {
        set({ isUpdatingProfile: true });
        try {
            const token = localStorage.getItem("token_chat_app")
            const result = await axiosInstance.put("/user/update-profile", data, { headers: { token: token } })
            console.log(result)
            if (result.data.success) {
                set({ authUser: result.data.user, isUpdatingProfile: true })
                toast.success("profile updated successfull  ")

            }
        } catch (err) {
            console.log(err)
            toast.error(err.response.data.message)

        } finally {
            set({ isUpdatingProfile: false });
        }
    },

    connectSocket: () => {
        const { authUser } = get();

        if (!authUser || get().socket?.connected)  // if user not login or signup then nothing happen
            return
        const socket = io(BASE_URL, {
            query: {  ///this called handsack in backend socket.handsack.query.userId
                userId: authUser._id,
            }

        });
        socket.connect();
        socket.on("getOnlineUser", (userIds) => {

            set({ onlineUsers: userIds })
        })
        set({ socket: socket });
    },

    disconnectSocket: () => {
        if (get().socket?.connect)
            get().socket.disconnect();
    }

}))