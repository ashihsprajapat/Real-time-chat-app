

import React, { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore';
import { MessageSquare } from 'lucide-react';
import { Loader } from 'lucide-react';
import {Link} from 'react-router-dom'
import AuthImagePattern from './../components/AuthImagePattern';

function SignUp() {

    const [showPassword, setShowPassword] = useState(false);

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
    })

    const { SignInFun, isLogginIng, isSingingUp } = useAuthStore();

    const validateForm = () => {

    }

    const handlChange = (e) => {
        e.preventDefault();
       // console.log(formData)
        setFormData((data) => (
            { ...data, [e.target.name]: e.target.value }
        ))
    }

    const handleSubmit= (e)=>{
        e.preventDefault();
        SignInFun(formData);
    }

    return (
        <div className='min-h-screen grid grid-cols-1 md:grid-cols-2 gap-2 px-2' >
            {/* left side div for data input */}
            <div className='w-full max-w-md space-y-8  px-auto  ' >

                {/* logo */}
                <div className="text-center mb-8">
                    <div className="flex-col flex items-center gap-2 group">
                        <div className="size-12 rounded-lg bg-primary.10 flex items-center justify-center group-hover:bg-primary/20 
                        transition-opacity ">
                            <MessageSquare className='size-6' />
                        </div>
                        <h1 className='text-2xl font-bold mt-2 ' >Create Account</h1>
                        <p className="text-base-content/60  ">
                            get started with your free account</p>
                    </div>
                </div>

                <form action="" onSubmit={handleSubmit} className='gap-5 flex flex-col'      >

                    {/* for full name as input */}
                    <div>
                        <label className="input validator">
                            <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
                                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                                    <circle cx="12" cy="7" r="4"></circle>
                                </g>
                            </svg>
                            <input type="input" required placeholder="Full Name"
                                minLength="3" maxLength="30"
                                title="Only letters, numbers or dash"
                                name={"fullName"}
                                onChange={(e) => handlChange(e)}
                            />
                        </label>
                        <p className="validator-hint hidden text-sm ">
                            Must be more then 5 charcter
                        </p>

                    </div>

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

                    <button type='submit' className='btn btn-primary f  w-fit ' disabled={isSingingUp}  >
                        {
                            isSingingUp ? <>

                                <Loader className="size-5 animate-spin" />
                                Loading...

                            </> : "Create Account"
                        }

                    </button>


                </form>

                <div className="text-center">
                    <p className="text-base-content">
                        Alreaddy have an accoundt?&nbsp;&nbsp;
                        <Link to='/login' className='link link-primary' >Sign in</Link>
                    </p>
                </div>

            </div>

            {/* right Side div fro scalton  */}
            <div className='hidden md:block  '>

                <AuthImagePattern/>

            </div>
        </div>
    )
}

export default SignUp
