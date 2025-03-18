

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


    const { authUser, } = useAuthStore();

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

                <div className='flex-1   overflow-auto p-4 space-y-4' >
                    {
                        messages.map((message, i) => (
                            <div
                                key={message._id} className={`chat   ${message.senderId === authUser._id ? "chat-end" : "chat-start"} `}
                                ref={messageEndRef} >
                                <div className="chat-image avatar ">
                                    <div className="size-10 rounded-full border">
                                        <img src={message.senderId === authUser._id ? authUser.profilePic || "../assets/image.png"
                                            :
                                            selectUser.profilePic || "../assets/image.png"} alt="" />

                                    </div>

                                </div>
                                <div className="chat-header mb-1">
                                    {
                                        <time className='text-sm opacity-50 ml-2'>{formateTime(message.createdAt)}</time>
                                    }

                                </div>
                                <div className="chat-bubble flex flex-col">

                                    {
                                        message.image && (
                                            <img src={message.image} alt='' />
                                        )
                                    }
                                    {
                                        message.text && <p>{message.text}</p>
                                    }
                                </div>


                            </div>
                        ))
                    }
                </div>

                {/* input chat */}

                <MessageInput />


        </div>
    )
}

export default ChatContainer
