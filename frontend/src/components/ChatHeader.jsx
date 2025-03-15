
import React from 'react'
import { Plus, Image, Navigation } from 'lucide-react';
import { useChateStore } from '../store/useChatStore';
import { useAuthStore } from './../store/useAuthStore';

function ChatHeader({ user }) {
    const { selectUser, setSelectedUser } = useChateStore();
    const { onlineUsers } = useAuthStore();
    return (
        <div className='p-2.5 border-b border-base-300 mb-3'>
            <div className='flex  justify-between  '>
                <div className='flex flex-row gap-3' >
                    <div className='avatar'>
                        <div className='size-10 rounded-full cursor-pointer'>
                            <img src={selectUser.profilePic || '../../src/assets/image.png'} alt=""
                                className='' />
                        </div>
                    </div>

                    <div>
                        <h3 className='font-medium' > {selectUser.fullName}</h3>
                        <p className={` text-sm  ${onlineUsers.includes(selectUser._id) ? "text-green-500" : "text-base-content/70"}`}>
                            {
                                onlineUsers.includes(selectUser._id) ? "online" : "offline"
                            }
                        </p>
                    </div>
                </div>
                <button onClick={() => setSelectedUser(null)} >
                    <Plus className='rotate-45  ' />
                </button>
            </div>
        </div>
    )
}

export default ChatHeader
