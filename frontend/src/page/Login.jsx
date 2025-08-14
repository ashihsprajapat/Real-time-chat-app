
import React, { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore';
import { Loader } from 'lucide-react';
import { Link } from 'react-router-dom'

function Login() {

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    })

    const { SignInFun, isLogginIng, Login } = useAuthStore();
    const [isLoading, setIsLoading]= useState(false);


    const handlChange = (e) => {
        e.preventDefault();

        setFormData((data) => (
            { ...data, [e.target.name]: e.target.value }
        ))
    }

    const [state, setState] = useState("Sign in")

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData)

        if (state == "Sign in") {

            Login(formData);
        } else {
            SignInFun(formData)
        }
    }
    return (
        <>

            


            <div class="flex h-[700px] w-full text-white">
                <div class="w-full hidden md:inline-block">
                    <img className="h-3/4 my-20 flex items-center px-5 w-3/4"  src="https://cdn-icons-png.flaticon.com/512/5539/5539745.png" alt="leftSideImage" />
                </div>

                <div class="w-full flex flex-col items-center justify-center">

                    <form class="md:w-96 w-80 flex flex-col items-center justify-center" onSubmit={handleSubmit} >
                        <h2 class="text-4xl text-gray-400 font-medium">{state}</h2>
                        <p class="text-sm text-gray-400/90 mt-3">Welcome back! Please sign in to continue</p>

                        <button type="button" class="w-full mt-8 bg-gray-500/10 flex items-center justify-center h-12 rounded-full">
                            <img src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/googleLogo.svg" alt="googleLogo" />
                        </button>

                        <div class="flex items-center gap-4 w-full my-5">
                            <div class="w-full h-px bg-gray-300/90"></div>
                            <p class="w-full text-nowrap text-sm text-gray-500/90">or sign in with email</p>
                            <div class="w-full h-px bg-gray-300/90"></div>
                        </div>

                        {/* full name input */}
                        {
                            state === 'Sign up' &&
                            <div class="flex items-center w-full bg-transparent border mb-4 border-gray-300/60 h-12 rounded-full overflow-hidden pl-6 gap-2">
                                <svg width="16" height="11" viewBox="0 0 16 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M0 .55.571 0H15.43l.57.55v9.9l-.571.55H.57L0 10.45zm1.143 1.138V9.9h13.714V1.69l-6.503 4.8h-.697zM13.749 1.1H2.25L8 5.356z" fill="#6B7280" />
                                </svg>
                                <input type="email" placeholder="Email id" class="bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none text-sm w-full h-full" required
                                    value={formData.email} onChange={(e) => handlChange(e)} name='email' />
                            </div>
                        }


                        {/* email input */}

                        <div class="flex items-center w-full bg-transparent border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6 gap-2">
                            <svg width="16" height="11" viewBox="0 0 16 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M0 .55.571 0H15.43l.57.55v9.9l-.571.55H.57L0 10.45zm1.143 1.138V9.9h13.714V1.69l-6.503 4.8h-.697zM13.749 1.1H2.25L8 5.356z" fill="#6B7280" />
                            </svg>
                            <input type="email" placeholder="Email id" class="bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none text-sm w-full h-full" required
                                value={formData.email} onChange={(e) => handlChange(e)} name='email' />
                        </div>

                        {/* password input */}
                        <div class="flex items-center mt-6 w-full bg-transparent border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6 gap-2">
                            <svg width="13" height="17" viewBox="0 0 13 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M13 8.5c0-.938-.729-1.7-1.625-1.7h-.812V4.25C10.563 1.907 8.74 0 6.5 0S2.438 1.907 2.438 4.25V6.8h-.813C.729 6.8 0 7.562 0 8.5v6.8c0 .938.729 1.7 1.625 1.7h9.75c.896 0 1.625-.762 1.625-1.7zM4.063 4.25c0-1.406 1.093-2.55 2.437-2.55s2.438 1.144 2.438 2.55V6.8H4.061z" fill="#6B7280" />
                            </svg>
                            <input type="password" placeholder="Password" class="bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none text-sm w-full h-full" required
                                minLength="6"
                                name='password' value={formData.password} onChange={(e) => handlChange(e)} />
                        </div>

                        {/*  conform */}
                        <div class="w-full flex items-center justify-between mt-8 text-gray-500/80">
                            <div class="flex items-center gap-2">
                                <input class="h-5" type="checkbox" id="checkbox" required />
                                <label class="text-sm" for="checkbox">Remember me</label>
                            </div>
                            {
                                state === 'Sign in' &&
                                <a class="text-sm underline" href="#">Forgot password?</a>

                            }
                        </div>

                        <button type="submit" class="mt-8 w-full h-11 rounded-full text-white bg-indigo-500 hover:opacity-90 transition-opacity">
                            {
                                isLogginIng ? <>
                                    <Loader className="size-5 animate-spin" />
                                    Loading...</>
                                    :
                                    (
                                        state
                                    )
                            }
                        </button>
                        {
                            state === 'Sign in' &&
                            <p class="text-gray-500/90 text-sm mt-4">Don’t have an account? <a class="text-indigo-400 hover:underline" href="#"
                                onClick={() => setState("Sign up")}>Sign up</a></p>

                        }

                        {
                            state === "Sign up" &&
                            <p class="text-gray-500/90 text-sm mt-4">Already have an account? <a class="text-indigo-400 hover:underline" href="#" onClick={() => setState("Sign in")}>Sing in</a></p>
                        }

                    </form>
                </div>
            </div>


        </>

    )
}

export default Login
