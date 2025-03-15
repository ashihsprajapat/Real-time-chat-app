
import React, { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore';
import { Loader } from 'lucide-react';

function Login() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    })

    const { isLogginIng, Login } = useAuthStore();


    const handlChange = (e) => {
        e.preventDefault();
        // console.log(formData)
        setFormData((data) => (
            { ...data, [e.target.name]: e.target.value }
        ))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        Login(formData);
    }
    return (
        <div className='mt-20 flex flex-col gap-4'>

            <form action="" onSubmit={handleSubmit} className='gap-5 flex flex-col'      >
                {/* for email input */}
                <label className="input validator">
                    <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
                            <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                        </g></svg>
                    <input type="email" placeholder="mail@site.com" required
                        value={formData.email} onChange={(e) => handlChange(e)} name='email' />
                </label>
                <div className="validator-hint hidden  text-sm">Enter valid email address</div>

                {/* for password input */}
                <label className="input validator">
                    <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor"><path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path><circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle></g></svg>
                    <input type="password" required placeholder="Password" minLength="6" title="Must be more than 8 characters"
                        name='password' value={formData.password} onChange={(e) => handlChange(e)} />
                </label>
                <p className="validator-hint hidden  text-sm">
                    Must be more than 6 characters
                </p>


                <button className='btn btn-primary w-1/4 ' type='submit' disabled={isLogginIng} >
                    {
                        isLogginIng ? <>
                            <Loader className="size-5 animate-spin" />
                            Loading...</>
                            :
                            "Sign up"
                    }
                </button>
            </form>
        </div>
    )
}

export default Login
