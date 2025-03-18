
import React, { useEffect } from 'react'
import { useChateStore } from '../store/useChatStore'
import ChatContainer from '../components/ChatContainer';
import NoChatSelect from '../components/NoChatSelect';
import SideBar from '../components/SideBar';
import SideBarSkeleton from '../skeletons/SideBarSkeleton';

function HomePage() {
    const { selectUser, setSelectedUser, getUsers, isUserLoading } = useChateStore();

    const onlineUser = [];


    useEffect(() => {
        getUsers()
    }, [getUsers])

    if (isUserLoading)
        return <SideBarSkeleton/>

    return (
        <div className='h-screen bg-base-200 '>
            <div className="flex items-center justify-center pt-20 px-4">
                <div className="bg-base-100 rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-8rem)]">
                    <div className="flex h-full rounded-lg overflow-hidden ">
                        <SideBar />
                        {/* sidbar */}
                        {
                            !selectUser ? <NoChatSelect />

                                :
                                <ChatContainer user={selectUser} />
                        }

                    </div>

                </div>

            </div>
        </div>
    )
}

export default HomePage
