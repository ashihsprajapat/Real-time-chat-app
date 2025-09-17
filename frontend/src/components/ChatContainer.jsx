

import React, { useEffect, useRef } from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { Plus, Image, Navigation } from 'lucide-react';
import { useChateStore } from '../store/useChatStore';
import ChatHeader from './ChatHeader';
import MessageInput from './MessageInput';
import MessageSkeleton from './../skeletons/MessageSkeleton';
import { formateTime } from './../lib/utils';

function ChatContainer({ user }) {
    const { onlineUsers, } = useAuthStore();

    const { setSelectedUser, messages, getMessage, sendMessage, selectUser, isMessageLoading, subscribeToMessages, unSubscribeFromMessage } = useChateStore();


    const { authUser,mode } = useAuthStore();

    const messageEndRef = useRef(null);



    useEffect(() => {
        getMessage(selectUser._id)

        subscribeToMessages();

        return () => unSubscribeFromMessage();
    }, [selectUser._id, sendMessage, getMessage, subscribeToMessages, unSubscribeFromMessage])

    useEffect(() => {
        if (messageEndRef.current && messages) {
            messageEndRef.current.scrollIntoView({ behavior: "smooth" })
        }
    }, [messages])

    if (isMessageLoading)
        return <div className=' w-full'>
            <ChatHeader />
            <MessageSkeleton />
            <MessageInput />
        </div>
    return (
        <div className="flex-1 flex flex-col overflow-auto ">

            <ChatHeader user={user} />



            {/* chats show */}

            <div className={`flex-1 overflow-auto p-4 space-y-4 ${mode === 'dark' ? 'bg-gray-900' : 'bg-gray-50'} scrollbar-thin scrollbar-thumb-primary scrollbar-track-transparent`}>
                {
                    messages.length !== 0 ? (
                        messages.map((message, i) => (
                            <div
                                key={message._id}
                                className={`chat ${message.senderId === authUser._id ? "chat-end" : "chat-start"} animate-fade-in`}
                                ref={i === messages.length - 1 ? messageEndRef : null}>
                                <div className="chat-image avatar">
                                    <div className="size-10 rounded-full border-2 border-gray-200 hover:scale-110 transition-transform duration-300 shadow-lg">
                                        <img
                                            src={message.senderId === authUser._id ? authUser.profilePic || "../assets/image.png"
                                                : selectUser.profilePic || "../assets/image.png"}
                                            alt="Profile"
                                            className="object-cover rounded-full"
                                        />
                                    </div>
                                </div>
                                <div className="chat-header mb-1">
                                    <time className={`text-xs ${mode === 'dark' ? 'text-gray-400' : 'text-gray-600'} ml-2 font-medium`}>
                                        {formateTime(message.createdAt)}
                                    </time>
                                </div>
                                <div className={`chat-bubble flex flex-col max-w-xs md:max-w-md lg:max-w-lg 
                                    ${message.senderId === authUser._id 
                                        ? mode === 'dark'
                                            ? 'bg-gray-700 text-white' 
                                            : 'bg-blue-400 text-white'
                                        : mode === 'dark'
                                            ? 'bg-gray-800 text-white'
                                            : 'bg-gray-200 text-gray-800'
                                    } rounded-xl shadow-md hover:shadow-xl transition-all duration-300 backdrop-blur-sm`}>
                                    {message.image && (
                                        <img
                                            src={message.image}
                                            alt="Message attachment"
                                            className="rounded-lg cursor-pointer hover:opacity-90 transition-opacity duration-300 max-w-full h-auto hover:scale-[1.02]"
                                            loading="lazy"
                                        />
                                    )}
                                    {message.text && (
                                        <p className="break-words leading-relaxed">{message.text}</p>
                                    )}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className={`flex-1 flex flex-col items-center justify-center ${mode === 'dark' ? 'text-gray-400' : 'text-gray-500'} animate-fade-in`}>
                            <div className="mb-4 transform hover:rotate-12 transition-transform duration-300">
                                <Navigation className="w-16 h-16 animate-bounce text-primary" />
                            </div>
                            <p className="text-2xl font-semibold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">No messages yet</p>
                            <p className="text-sm mt-2 opacity-80">Send a message to start the conversation!</p>
                        </div>
                    )
                }
            </div>

            {/* input chat */}

            <MessageInput />


        </div>
    )
}

export default ChatContainer
