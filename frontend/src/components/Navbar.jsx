import React from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { Link } from 'react-router-dom';
import { MessageSquare } from 'lucide-react';
import { Settings, User, LogOut, Sun, Moon } from 'lucide-react';

function Navbar() {
    const { authUser, logOut, mode, toggleMode, } = useAuthStore();
    
    return (
        <header className={`fixed w-full top-0 z-40 backdrop-blur-lg border-b shadow-sm transition-all duration-300 ${mode === 'light' ? 'bg-white/90 border-gray-100' : 'bg-gray-900/90 border-gray-800'}`}>
            <div className="container mx-auto px-4 h-16">
                <div className="flex items-center justify-between h-full">
                    <div className="flex items-center gap-8">
                        <Link to="/" className='flex items-center gap-3 hover:opacity-90 transition-all group'>
                            <div className={`size-10 rounded-xl flex items-center justify-center transform group-hover:scale-105 transition-all ${mode === 'light' ? 'bg-blue-50 shadow-sm' : 'bg-blue-900/30'}`}>
                                <MessageSquare className={`w-5 h-5 ${mode === 'light' ? 'text-blue-600' : 'text-blue-400'}`} />
                            </div>
                            <h1 className={`text-xl font-bold ${mode === 'light' ? 'text-gray-800' : 'text-gray-100'}`}>Chatty</h1>
                        </Link>
                    </div>

                    <div className='flex items-center gap-3'>
                        <button 
                            onClick={() => toggleMode(mode === 'light' ? 'dark' : 'light')} 
                            className={`btn btn-sm btn-circle hover:scale-105 transition-transform ${mode === 'light' ? 'bg-gray-100 hover:bg-gray-200' : 'bg-gray-800 hover:bg-gray-700'}`}
                        >
                            {mode === 'light' ? (
                                <Moon className={`w-4 h-4 ${mode === 'light' ? 'text-gray-700' : 'text-gray-300'}`} />
                            ) : (
                                <Sun className={`w-4 h-4 ${mode === 'light' ? 'text-gray-700' : 'text-gray-300'}`} />
                            )}
                        </button>
                        <Link to="/setting" className={`btn btn-sm gap-2 transition-all hover:scale-105 ${mode === 'light' ? 'bg-gray-100 hover:bg-gray-200 text-gray-700' : 'bg-gray-800 hover:bg-gray-700 text-gray-300'}`}>
                            <Settings className='w-4 h-4' />
                            <span className='hidden sm:inline'>Setting</span>
                        </Link>

                        {authUser && (
                            <>
                                <Link to="/profile" className={`btn btn-sm gap-2 transition-all hover:scale-105 ${mode === 'light' ? 'bg-gray-100 hover:bg-gray-200 text-gray-700' : 'bg-gray-800 hover:bg-gray-700 text-gray-300'}`}>
                                    <User className='size-4' />
                                    <span className='hidden sm:inline'>Profile</span>
                                </Link>

                                <Link to="/logout" className={`btn btn-sm gap-2 transition-all hover:scale-105 ${mode === 'light' ? 'bg-red-50 hover:bg-red-100 text-red-600' : 'bg-red-900/30 hover:bg-red-900/40 text-red-400'}`} onClick={logOut}>
                                    <LogOut className='size-4' />
                                    <span className='hidden sm:inline'>Logout</span>
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Navbar
