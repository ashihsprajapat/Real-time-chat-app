
import { create } from 'zustand'
import toast from 'react-hot-toast'
import { axiosInstance } from '../lib/axios'
import { useAuthStore } from './useAuthStore'

export const useChateStore = create((set, get) => ({
    messages: [],
    users: [],
    selectUser: null,
    isUserLoading: false,
    isMessageLoading: false,


    getUsers: async () => {
        set({ isUserLoading: true })
        try {
            const token_chat_app = localStorage.getItem("token_chat_app")

            const result = await axiosInstance.get("/api/messages/users", { headers: { token: token_chat_app } });

            if (result.data.success) {
                set({ users: result.data.user, })


            }


        } catch (err) {

            toast.error(err.response.data.message);

        } finally {
            set({ isUserLoading: false });
        }
    },


    getMessage: async (userId) => {
        set({ isMessageLoading: true });
        try {
            const result = await axiosInstance.get(`/api/messages/${userId}`, { headers: { token: localStorage.getItem("token_chat_app") } })

            set({ messages: result.data.message })
        } catch (err) {
            console.log(err);
            toast.error(err.response.data.message)
        } finally {
            set({ isMessageLoading: false })
        }
    },

    sendMessage: async (MessageData) => {
        const { selectUser, messages } = get();
        try {

            console.log("MessageData is in sendMessage function ",MessageData)

            const token = localStorage.getItem("token_chat_app")
            const result = await axiosInstance.post(`/api/messages/send-message/${selectUser._id}`, MessageData, { headers: { token: token } })
            
            if (result.data.success) {
                set({ messages: [...messages, result.data.newMessage] })
            }
            return;
        } catch (err) {
            console.log(err)
            toast.error(err.response.data.message)
        } finally {

        }

    },

    subscribeToMessages: () => {
        const { selectUser } = get();
        if (!selectUser) return;

        const socket = useAuthStore.getState().socket;




        socket.on("newMessage", (newMessage) => {
            console.log("new message socket.on ",newMessage)
            console.log("selected user is ",selectUser)
            const isMessageSentFromUser = newMessage.senderId === selectUser._id;
            if (!isMessageSentFromUser){
                return;}
            set({
                messages: [...get().messages, newMessage]
            })  
        })
    },

    unSubscribeFromMessage: () => {
        const socket = useAuthStore.getState().socket;
        socket.off('newMessage');

    },

    //to do optimize 
    setSelectedUser: async (user) => {

        try {
            set({ selectUser: user })

        } catch (err) {

        } finally {

        }

    }


}))