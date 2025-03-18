

import { create } from 'zustand'
import { axiosInstance } from './../lib/axios.js';
import { toast } from 'react-hot-toast'
import {io} from 'socket.io-client'


const BASE_URL="http://localhost:8080/"

export const useAuthStore = create((set, get) => ({
    authUser: null,

    isSingingUp: false,

    isLogginIng: false,

    isUpdatingProfile: false,

    isCheckingAuth: true,

    onlineUsers: ["67d02212605072ee8f546c00"],

    socket:null,    

    chekAuth: async () => {
        try {
            const token_chat_app = localStorage.getItem("token_chat_app");
            const result = await axiosInstance.get("/auth/check", { headers: { token: token_chat_app } });

            if (result.data.success) {
                set({ authUser: result.data.user })
                get().connectSocket();
            }

        } catch (err) {
            console.log("err is", err)
            //   toast.error(err.response.data.message)
            set({ authUser: null })

        } finally {
            set({ isCheckingAuth: false, })
        }

    },

    SignInFun: async (data) => {
        console.log(data)
        set({ isSingingUp: true });
        try {

            const result = await axiosInstance.post("/auth/register", data);
            console.log(result)
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
            console.log(result)
           
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

            const result = await axiosInstance.put("/user/update-profile", data)
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
    connectSocket:()=>{

    },

    disconnectSocket: ()=>{
        const {authUser}= get();
        if(authUser === null || get().socket ?.connected)
            return
        const socket = io(BASE_URL);
        socket.connect();
    }

}))