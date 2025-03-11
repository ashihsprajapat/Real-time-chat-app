
import { Routes, Route, Navigate } from 'react-router-dom'
import React, { useEffect } from 'react'
import HomePage from './page/HomePage'
import Navbar from './components/Navbar';
import SignUp from './page/SignUp';
import Login from './page/Login';
import SettingPage from './page/SettingPage';
import ProfilePage from './page/ProfilePage';
import { useAuthStore } from './store/useAuthStore';
import { Loader } from 'lucide-react';
import { Toaster } from 'react-hot-toast'

function App() {

    const { authUser, chekAuth, isCheckingAuth } = useAuthStore();

    useEffect(() => {
        chekAuth();
    }, [chekAuth])

    // console.log({ authUser })

    if (isCheckingAuth && !authUser) {
        return (
            <div className='flex items-center justify-center h-screen' >
                <Loader className="size-14 animate-spin" />
            </div>
        );
    }

    return (
        <div>
            <Navbar />
            <Routes>

                <Route path='/' element={authUser ? <HomePage /> : <Navigate to='/login' />} />
                <Route path='/signup' element={!authUser ? <SignUp /> : <Navigate to='/' />} />
                <Route path='/login' element={!authUser ? <Login /> : <Navigate to='/' />} />
                <Route path='/setting' element={authUser ? <SettingPage /> : <Navigate to='/login' />} />
                <Route path='/profile' element={authUser ? <ProfilePage /> : <Navigate to='/login' />} />


            </Routes>
            <Toaster position="bottom-left"
                reverseOrder={false} />
        </div>



    )
}

export default App
