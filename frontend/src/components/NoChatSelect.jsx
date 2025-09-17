
import React from 'react'
import { MessageSquare } from "lucide-react";
import { useAuthStore } from '../store/useAuthStore';

function NoChatSelect() {
    const {mode}= useAuthStore()
    return (
        <div className={`w-full flex flex-1 flex-col items-center justify-center p-16 ${mode === 'dark' ? 'bg-gray-800/50' : 'bg-gray-100/50'}`}>
            <div className="max-w-md text-center space-y-6">
                {/* Icon Display */}
                <div className="flex justify-center gap-4 mb-4">
                    <div className="relative">
                        <div
                            className={`w-16 h-16 rounded-2xl flex items-center justify-center animate-bounce ${mode === 'dark' ? 'bg-primary/20' : 'bg-primary/10'}`}
                        >
                            <MessageSquare className={`w-8 h-8 ${mode === 'dark' ? 'text-primary-light' : 'text-primary'}`} />
                        </div>
                    </div>
                </div>

                {/* Welcome Text */}
                <h2 className={`text-2xl font-bold ${mode === 'dark' ? 'text-white' : 'text-gray-800'}`}>
                    Welcome to My Chat App!
                </h2>
                <p className={`${mode === 'dark' ? 'text-gray-300/60' : 'text-gray-600/60'}`}>
                    Select a conversation from the sidebar to start chatting
                </p>
            </div>
        </div>
    )
}

export default NoChatSelect
