
import { create } from 'zustand'
import toast from 'react-hot-toast'
import { axiosInstance } from '../lib/axios'

export const useChateStore = create((set) => ({
    messages: [],
    users: [],
    selectUser: null,
    isUserLoading: false,
    isMessageLoading: false,


    getUsers: async () => {
        set({ isUserLoading: true })
        try {
            const token_chat_app = localStorage.getItem("token_chat_app")

            const result = await axiosInstance.get("/messages/users", { headers: { token: token_chat_app } });
            // console.log("get Users is", result)
            if (result.data.success) {
                set({ users: result.data.user, })

                set({ isUserLoading: false })
            }
            

        } catch (err) {
            console.log(err)
            toast.error(err.response.data.message);

        } finally {
            set({ isUserLoading: false });
        }
    },


    getMessage: async (userId) => {
        set({ isMessageLoading: true });
        try {
            const result = await axiosInstance.get(`/messages/${userId}`,{headers:{token:localStorage.getItem("token_chat_app")}})
            set({ message: result.data })
        } catch (err) {
            console.log(err);
            toast.error(err.response.data.message)
        } finally {
            set({ isMessageLoading: false })
        }
    },

    sendMessage: async(MessageData)=>{
        const {selectUser, message}= get();
        try{
            
            const result= await axiosInstance.post(`/messages/send-message/${selectUser._id}`,MessageData)
            console.log(result);
            if(result.data.message){
                set({messages: [...messages,result.data]})
            }
        }catch(err){
            toast.error(err.response.data.message)
        }finally{

        }

    },

    setSelectedUser: async (user) => {

        try {
            set({selectUser:user})

        } catch (err) {

        } finally {

        }

    }


}))