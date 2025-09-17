

import React, { useEffect, useState } from 'react'
import { useChateStore } from '../store/useChatStore'
import SideBarSkeleton from '../skeletons/SideBarSkeleton';
import { Users } from 'lucide-react'
import { useAuthStore } from '../store/useAuthStore';

function SideBar() {
    const { getUsers, isUserLoading, users, selectUser, setSelectedUser } = useChateStore()

    // const onlineUser = ["67d02212605072ee8f546c00"];
    const { onlineUsers, mode, toggleMode, } = useAuthStore()

    const [showOnlineOnly, setShowOnlineOnly] = useState(false);

    const filteresUser = showOnlineOnly ? users.filter(user => onlineUsers.includes(user._id)) : users;

    useEffect(() => {
        if (isUserLoading) {
            getUsers();
        }

        // isUserLoading=true;
    }, [users])

    if (isUserLoading)
        return (
            <div>

                <SideBarSkeleton />
            </div>



        )


    return (
        <div className={`w-20 h-full lg:w-72 border-r flex flex-col transition-all duration-200 
        ${mode === 'dark' ? 'bg-gray-900 border-gray-700 text-white' : 'bg-white border-gray-200 text-gray-800'}`}>
            <div className={`border-b w-full p-5 ${mode === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Users className={`size-12 ${mode === 'dark' ? 'text-gray-300' : 'text-gray-700'}`} />
                        <span className='font-medium hidden lg:block'>Contacts</span>
                    </div>
                    <button
                        onClick={() => toggleMode(mode === 'light' ? 'dark' : 'light')}
                        className={`p-2 rounded-full ${mode === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                    >
                        {mode === 'light' ? '🌙' : '☀️'}
                    </button>
                </div>

                {/* Online users */}
                <div className="mt-3 hidden lg:flex items-center gap-2">
                    <label className='gap-2 flex items-center cursor-pointer'>
                        <input
                            type="checkbox"
                            className={`checkbox checkbox-sm ${mode === 'dark' ? 'checkbox-ghost' : 'checkbox-primary'}`}
                            checked={showOnlineOnly}
                            onChange={(e) => setShowOnlineOnly(e.target.checked)}
                        />
                        <span className='text-sm'>Show online only</span>
                    </label>
                </div>
            </div>

            <div className="overflow-y-auto w-full py-3 scrollbar-thin scrollbar-thumb-rounded-full">
                {filteresUser.map((user) => (
                    <button
                        className={`w-full p-3 flex items-center transition-colors gap-4 
                        ${mode === 'dark'
                                ? 'hover:bg-gray-800'
                                : 'hover:bg-gray-100'
                            }
                        ${selectUser?._id === user._id
                                ? mode === 'dark'
                                    ? 'bg-gray-800 ring-1 ring-gray-700'
                                    : 'bg-gray-100 ring-1 ring-gray-200'
                                : ''
                            }`}
                        key={user._id}
                        onClick={() => setSelectedUser(user)}
                    >
                        <div className='relative mx-auto lg:mx-0'>
                            <img
                                src={user.profilePic || '../../src/assets/image.png'}
                                alt={user.name}
                                className='rounded-full size-12 object-cover shadow-md'
                            />
                            {onlineUsers.includes(user._id) && (
                                <span className={`absolute bottom-0 right-0 size-3 bg-green-500 rounded-full 
                                    ${mode === 'dark' ? 'ring-2 ring-gray-900' : 'ring-2 ring-white'}`}
                                />
                            )}
                        </div>

                        <div className="hidden lg:block text-left min-w-0">
                            <div className="font-medium truncate">
                                {user.fullName}
                            </div>
                            <div className={`text-sm ${mode === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                                {onlineUsers.includes(user._id) && "online"}
                            </div>
                        </div>
                    </button>
                ))}

                {filteresUser.length === 0 && (
                    <div className={`text-center py-4 ${mode === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                        No online users
                    </div>
                )}
            </div>
        </div>
    )
}

export default SideBar
