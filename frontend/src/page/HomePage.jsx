
import React, { useEffect } from 'react'
import { useChateStore } from '../store/useChatStore'
import ChatContainer from '../components/ChatContainer';
import NoChatSelect from '../components/NoChatSelect';
import SideBar from '../components/SideBar';
import SideBarSkeleton from '../skeletons/SideBarSkeleton';
import { useAuthStore } from '../store/useAuthStore';

function HomePage() {
    const { selectUser, setSelectedUser, getUsers, isUserLoading, } = useChateStore();

    const onlineUser = [];

    const {mode, toggleMode,}= useAuthStore();


    useEffect(() => {
        getUsers()
    }, [getUsers])

    if (isUserLoading)
        return <SideBarSkeleton/>

    return (
        <div className={`h-screen  ${mode === 'light' ? 'bg-gray-300' : 'bg-gray-900'}`}>
        
            <div className="flex items-center justify-center pt-20 px-4">
                <button 
                    onClick={() => toggleMode(mode === 'light' ? 'dark' : 'light')}
                    className={`absolute top-4 right-4 p-2 rounded-full 
                        ${mode === 'light' ? 'bg-gray-200 text-gray-800' : 'bg-gray-700 text-gray-200'}`}
                >
                    {mode === 'light' ? '🌙' : '☀️'}
                </button>
                <div className={`rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-8rem)] 
                    ${mode === 'light' ? 'bg-white' : 'bg-gray-800'}`}>
                    <div className="flex h-full rounded-lg overflow-hidden">
                        <SideBar />
                        {/* sidebar */}
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
