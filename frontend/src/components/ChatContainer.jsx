

import React, { useEffect } from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { Plus, Image, Navigation } from 'lucide-react';
import { useChateStore } from '../store/useChatStore';
import ChatHeader from './ChatHeader';
import MessageInput from './MessageInput';
import MessageSkeleton from './../skeletons/MessageSkeleton';

function ChatContainer({ user }) {
    const { onlineUsers, } = useAuthStore();
    const { setSelectedUser, getMessage, selectUser, isMessageLoading } = useChateStore();
    // console.log('online users is', onlineUsers)
    console.log('user in chatContainer', user)

    useEffect(() => {
        getMessage(selectUser._id)
    }, [selectUser._id, getMessage])

    if (isMessageLoading)
        return <div className=' w-full'>
            <ChatHeader />
            <MessageSkeleton />
            <MessageInput/>
        </div>
    return (
        <div className="flex-1 flex flex-col overflow-auto ">

            <ChatHeader user={user} />

            <div className='w-full px-2'>


                {/* chats show */}

                {/* input chat */}

                <MessageInput />

                {user.fullName}
            </div>
        </div>
    )
}

export default ChatContainer
