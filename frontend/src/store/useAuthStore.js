

import { create } from 'zustand'
import { axiosInstance } from './../lib/axios.js';
import { toast } from 'react-hot-toast'

export const useAuthStore = create((set) => ({
    authUser: null,

    isSingingUp: false,

    isLogginIng: false,

    isUpdatingProfile: false,

    isCheckingAuth: true,

    chekAuth: async () => {
        try {
            const { data } = await axiosInstance.get("/auth/check");
            // console.log("data is", data)
            set({ authUser: data })


        } catch (err) {
            set({ authUser: null })
            //  console.log("err is", err)
        } finally {
            set({ isCheckingAuth: false, })
        }

    },

    SignInFun: async (data) => {
        console.log(data)
        set({ isSingingUp: true });
        try {

            const result = await axiosInstance.post("/auth/register", data);
            //console.log(result.data)
            toast.success(data.message)
            set({ authUser: result.data })

        } catch (err) {
            console.log(err);
            toast.error(err.response.data.message);

        } finally {
            set({ isSingingUp: false })
        }

    },

    logOut: async () => {
        try {

            const { data } = await axiosInstance.post("/auth/logout");
            console.log(data)

            set({ authUser: null });
            toast.success("logout success")

        } catch (err) {
            toast.error(data.message);
        }
    },

    Login: async(userData)=>{
        try{

            const result= await axiosInstance.post("/auth/login", userData);
            console.log(result)
            set({ isLogginIng:true})
            if(res.data.success){
                toast.success(result.data.message)
                set({authUser:result.data})
                set({isSingingUp:true})
            }

        }catch(err){
            toast.error(result.data.message)
            set({ isLogginIng:false})
        }
    }

}))