

import React, { useEffect } from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { Plus, Image, Navigation } from 'lucide-react';
import { useChateStore } from '../store/useChatStore';
import ChatHeader from './ChatHeader';
import MessageInput from './MessageInput';
import MessageSkeleton from './../skeletons/MessageSkeleton';
import { formateTime } from './../lib/utils';

function ChatContainer({ user }) {
    const { onlineUsers, } = useAuthStore();
    const { setSelectedUser, messages, getMessage,sendMessage, selectUser, isMessageLoading } = useChateStore();
    // console.log('online users is', onlineUsers)
    //console.log('user in chatContainer', user)

    const { authUser } = useAuthStore();
    //console.log(selectUser)
    //console.log(authUser)
    console.log(messages)

    useEffect(() => {
        getMessage(selectUser._id)
    }, [selectUser._id,sendMessage, getMessage])

    if (isMessageLoading)
        return <div className=' w-full'>
            <ChatHeader />
            <MessageSkeleton />
            <MessageInput />
        </div>
    return (
        <div className="flex-1 flex flex-col overflow-auto ">

            <ChatHeader user={user} />

            <div className='w-full px-2'>


                {/* chats show */}

                <div className='flex-1   overflow-auto p-4 space-y-4' >
                    {
                        messages.map((message, i) => (
                            <div
                                key={i} className={`chat   ${message.senderId === authUser._id ? "chat-end" : "chat-start"} `} >
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
        </div>
    )
}

export default ChatContainer
