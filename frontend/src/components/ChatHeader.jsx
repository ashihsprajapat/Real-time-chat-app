
import React from 'react'
import { Plus, Image, Navigation } from 'lucide-react';
import { useChateStore } from '../store/useChatStore';
import { useAuthStore } from './../store/useAuthStore';

function ChatHeader({ user }) {
    const { selectUser, setSelectedUser , } = useChateStore();
    const { onlineUsers,mode } = useAuthStore();
    return (
        <div className={`p-2.5 border-b ${mode === 'dark' ? 'border-gray-700 bg-gray-800' : 'border-gray-100 bg-white'} mb-3 transition-colors duration-200`}>
            <div className='flex justify-between items-center'>
                <div className='flex flex-row gap-3 items-center' >
                    <div className='avatar'>
                        <div className={`size-10 rounded-full cursor-pointer ring-2 ${mode === 'dark' ? 'ring-gray-600' : 'ring-gray-200'}`}>
                            <img 
                                src={selectUser.profilePic || '../../src/assets/image.png'} 
                                alt={selectUser.fullName}
                                className='object-cover' 
                            />
                        </div>
                    </div>

                    <div>
                        <h3 className={`font-medium text-lg ${mode === 'dark' ? 'text-white' : 'text-gray-800'}`}>
                            {selectUser.fullName}
                        </h3>
                        <p className={`text-sm ${
                            onlineUsers.includes(selectUser._id) 
                                ? "text-green-500" 
                                : mode === 'dark' ? "text-gray-400" : "text-gray-500"
                        }`}>
                            {onlineUsers.includes(selectUser._id) ? "online" : "offline"}
                        </p>
                    </div>
                </div>
                <button 
                    onClick={() => setSelectedUser(null)}
                    className={`p-2 rounded-full hover:bg-opacity-10 transition-colors ${
                        mode === 'dark' 
                            ? 'hover:bg-gray-300 text-gray-300' 
                            : 'hover:bg-gray-700 text-gray-700'
                    }`}
                >
                    <Plus className='rotate-45 w-6 h-6' />
                </button>
            </div>
        </div>
    )
}

export default ChatHeader
