
import React, { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { Camera, CircleUser } from 'lucide-react';
import moment from 'moment';
function ProfilePage() {

    const { authUser, isUpdatingProfile, updateProfile , mode} = useAuthStore();


    const [imageFile, setImageFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);

    const handleImage = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setImageFile(file); // store file
        const preview = URL.createObjectURL(file); // create blob preview
        setPreviewUrl(preview); // show image

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = async () => {
            const base64Image = reader.result;
            await updateProfile({ profilePic: base64Image }); // or file depending on backend
        };
    };


    // console.log("image is", image)
    return (
        <div className={`h-screen pt-20 ${mode === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
            <div className="max-w-xl mx-auto p-4 py-8">
                <div className={`rounded-xl px-4 py-10 space-y-8 items-center justify-center shadow-lg ${mode === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                    <div className="text-center">
                        <h1 className={`text-3xl font-serif ${mode === 'dark' ? 'text-white' : 'text-gray-800'}`}>Profile</h1>
                        <p className={`text-md mt-2 ${mode === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Your profile information</p>
                    </div>

                    {/* avtar upload */}
                    <div className="flex flex-col items-center gap-4 py-4">
                        <div className="relative items-center p-4 w-1/4">
                            <img
                                src={previewUrl || authUser.profilePic || "../../src/assets/image.png"}
                                alt="Profile"
                                className="rounded-full w-full h-full object-cover border-2 border-primary"
                            />

                            <label htmlFor="avtar_upload"
                                className={`absolute bottom-0 right-0 gap-2 bg-primary rounded-full p-1
                                hover:scale-125 transition-all duration-200   
                                ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}`}>
                                <Camera className={`cursor-pointer w-6 h-6 ${mode === 'dark' ? 'text-white' : 'text-gray-800'}`} />
                                <input id='avtar_upload' type="file" className='hidden'
                                    onChange={handleImage}
                                    disabled={isUpdatingProfile}
                                />
                            </label>
                        </div>
                        <p className={`text-sm ${mode === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                            {isUpdatingProfile ? "Uploading..." : "Click the camera icon to update your photo"}
                        </p>
                    </div>

                    {/*  user information     */}
                    <div className='flex flex-col gap-3 justify-around w-full'>
                        <div className='w-full'>
                            <label className={`input validator w-full border ${mode === 'dark' ? 'border-gray-700 bg-gray-700' : 'border-gray-200 bg-gray-50'}`}>
                                <svg className={`h-[1em] ${mode === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                    <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
                                        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                                        <circle cx="12" cy="7" r="4"></circle>
                                    </g>
                                </svg>
                                <input type="input" required placeholder="Full Name"
                                    className={`bg-transparent ${mode === 'dark' ? 'text-white' : 'text-gray-800'}`}
                                    minLength="3" maxLength="30"
                                    title="Only letters, numbers or dash"
                                    value={authUser.fullName}
                                    readOnly
                                />
                            </label>
                        </div>

                        <label className={`input validator w-full border ${mode === 'dark' ? 'border-gray-700 bg-gray-700' : 'border-gray-200 bg-gray-50'}`}>
                            <svg className={`h-[1em] ${mode === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
                                    <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                                </g>
                            </svg>
                            <input type="email" placeholder="mail@site.com" required
                                className={`bg-transparent ${mode === 'dark' ? 'text-white' : 'text-gray-800'}`}
                                value={authUser.email}
                                readOnly 
                            />
                        </label>

                    </div>

                    <div className={`${mode === 'dark' ? 'text-white' : 'text-gray-800'}`}>
                        <h2 className='text-xl font-semibold mb-4'>Account Information</h2>
                        <div className='flex flex-row justify-between text-sm'>
                            <p>Member Since</p>
                            <p className={mode === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                                {moment(Date.now()).format('MMMM DD, YYYY')}
                            </p>
                        </div>
                        <hr className={`my-4 ${mode === 'dark' ? 'border-gray-700' : 'border-gray-200'}`} />
                        <div className='flex flex-row justify-between text-sm'>
                            <p>Account Status</p>
                            <p className='text-green-500 font-medium'>
                                Active
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfilePage
