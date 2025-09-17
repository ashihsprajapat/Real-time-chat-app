
import React from 'react'
import { useAuthStore } from '../store/useAuthStore';

function MessageSkeleton() {
    const skeletonMessages = Array(5).fill(null);
    const {mode}= useAuthStore()
    return (
        <div className={`flex-1 overflow-auto p-4 space-y-4 ${mode === 'dark' ? 'bg-gray-900' : 'bg-gray-50'} scrollbar-thin scrollbar-thumb-primary scrollbar-track-transparent`}>
            {
                skeletonMessages.map((_, i) => (
                    <div key={i} className={`chat ${i % 2 === 0 ? "chat-start" : "chat-end"} animate-fade-in`}>
                        <div className="chat-image avatar">
                            <div className="size-10 rounded-full border-2 border-gray-200">
                                <div className={`skeleton w-full h-full rounded-full ${mode === 'dark' ? 'bg-gray-700' : 'bg-gray-300'}`}></div>
                            </div>
                        </div>
                        <div className="chat-header mb-1">
                            <div className={`skeleton h-4 w-16 ${mode === 'dark' ? 'bg-gray-700' : 'bg-gray-300'}`}></div>
                        </div>
                        <div className={`chat-bubble flex flex-col max-w-xs md:max-w-md lg:max-w-lg ${
                            i % 2 === 0 
                                ? mode === 'dark' 
                                    ? 'bg-gray-800' 
                                    : 'bg-gray-200'
                                : mode === 'dark'
                                    ? 'bg-gray-700'
                                    : 'bg-blue-400'
                        } rounded-xl shadow-md`}>
                            <div className={`skeleton h-16 w-[200px] ${mode === 'dark' ? 'bg-gray-600' : 'bg-gray-300'}`}></div>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default MessageSkeleton
