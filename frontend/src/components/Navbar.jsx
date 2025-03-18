
import React from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { Link } from 'react-router-dom';
import { MessageSquare } from 'lucide-react';
import { Settings,User, LogOut } from 'lucide-react';

function Navbar() {
    const { authUser, logOut } = useAuthStore();
    
    return (
        <header className='  bg-base-100 border-b border-base-300 fixed w-full top-0 z-40 backdrop-blur-lg bg-base-100/80' >

            <div className="container mx-auto px-4 h-16">
                <div className="flex items-center justify-between h-full">

                    <div className="flex items-center gap-8">
                        <Link to="/" className='flex items-center gap-2.5 hover:opacity-80 transition-all'  >
                            <div className="siz-9 rounded-lg bg-primary/10 flex items-center justify-normal ">
                                <MessageSquare className='w-5 h-5 text-primary' />
                            </div>
                            <h1 className='text-lg font-bold' >Chatty</h1>
                        </Link>

                    </div>

                    <div className='flex items-center  gap-2' >
                        <Link to="/setting" className='btn btn-sm gap-2 transition-colors' >
                            <Settings className='w-4 h-4' />
                            <span className='hidden sm:inline' > Setting </span>
                        </Link>

                        {
                            authUser && (
                                <>
                                <Link to="/profile" className='btn btn-sm gap-2' >
                                    <User className='size-5' />
                                    <span className='hidden sm:inline'>Profile</span>
                                </Link>

                                <Link to="/logout" className='btn btn-sm gap-2' onClick={logOut} >
                                    <LogOut className='size-5' />
                                    <span className='hidden sm:inline'>Logout</span>
                                </Link>
                                </>
                            )
                        }

                    </div>

                </div>

            </div>


        </header>
    )
}

export default Navbar
