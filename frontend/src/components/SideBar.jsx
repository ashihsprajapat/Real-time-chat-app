

import React, { useEffect, useState } from 'react'
import { useChateStore } from '../store/useChatStore'
import SideBarSkeleton from '../skeletons/SideBarSkeleton';
import { Users } from 'lucide-react'
import { useAuthStore } from '../store/useAuthStore';

function SideBar() {
    const { getUsers, isUserLoading, users, selectUser, setSelectedUser } = useChateStore()

    // const onlineUser = ["67d02212605072ee8f546c00"];
    const { onlineUsers } = useAuthStore()

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
        <div className='w-20  h-full lg:w-72 border-r border-base-300
        flex flex-col transition-all duration-200 border' >
            <div className="border-b border-base-300 w-full p-5  ">
                <div className="flex items-center gap-2">
                    < Users className='size-12 ' />
                    <span className='font-medium hidden lg:block'>Contect</span>
                </div>

                {/* Online users */}
                <div className="mt-3 hidden lg:flex items-center gap-2">
                    <label htmlFor="" className='gap-2 flex items-center cursor-pointer ' >
                        <input type="checkbox" className='checkbox checkbox-sm'
                            checked={showOnlineOnly} 
                            onChange={(e)=> setShowOnlineOnly(e.target.checked)} />
                        <span className='text-sm' >Show online only</span>

                    </label>

                </div>

            </div>
            <div className="overflow-y-auto w-full  py-3  ">
                {

                    filteresUser.map((user, i) => (

                        <button className={`w-full p-3 flex items-center hover:bg-base-300 transition-colors gap-4 
                            ${selectUser?._id === user._id ? "bg-base-300 ring-1 ring-base-300" : ""} `}
                            key={user._id} onClick={() => setSelectedUser(user)} >

                            {/*  */}

                            <div className='relative mx-auto lg:mx-0' >
                                <img src={user.profilePic || '../../src/assets/image.png'} alt={user.name}
                                    className='rounded-full size-12 object-cover' />
                                {
                                    onlineUsers.includes(user._id) && (
                                        <span className='absolute bottom-0 right-0 size-3 bg-green-500 rounded-full ring-2 ring-zinc-900' />
                                    )
                                }

                            </div>
                            {/* user info -only large screen  */}
                            <div className="hidden lg:block text-left min-w-0 ">
                                <div className="font-medium truncate ">
                                    {user.fullName}
                                </div>
                                <div className="text-sm text-zinc-400 ">
                                    {onlineUsers.includes(user._id) ? "online" : "offline"}
                                </div>

                            </div>
                        </button>
                    ))
                }
                {
                    filteresUser.length ===0 && (
                        <div className='text-center text-zinc-500 py-4'>
                            No online users
                        </div>
                    )
                }

            </div>
        </div>
    )
}

export default SideBar
