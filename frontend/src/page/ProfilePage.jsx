
import React, { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { Camera, CircleUser } from 'lucide-react';
import moment from 'moment';
function ProfilePage() {

    const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();


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
        <div className='h-screen pt-20' >
            <div className="max-w-xl mx-auto p-4 py-8   ">
                <div className='bg-base-300 rounded-xl px-4 py-10 space-y-8 items-center justify-center  ' >
                    <div className="text-center">
                        <h1 className='text-3xl font-serif  ' >Profile</h1>
                        <p className='text-md mt-2 ' >Your profile information</p>
                    </div>

                    {/* avtar upload */}

                    <div className="flex flex-col items-center gap-4  py-4 ">
                        <div className="relative  items-center p-4 w-1/4">

                            <img
                                src={previewUrl || authUser.profilePic || "../../src/assets/image.png"}
                                alt="Profile"
                                className="rounded-full"
                            />

                            <label htmlFor="avtar_upload"
                                className={` absolute bottom-0 right-0  gap-2
                                hover:scale-125  transition-all duration-200   
                                ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}   `}  >
                                <Camera className=' cursor-pointer text-gray-600  w-8 h-7  ' />
                                <input id='avtar_upload' type="file" className='hidden'
                                    onChange={handleImage}

                                    disabled={isUpdatingProfile}
                                />
                            </label>
                        </div>
                        <p className="text-sm text-zinc-400 ">
                            {isUpdatingProfile ? " uploading" : "Click the camera icon to update your photo"}
                        </p>

                    </div>

                    {/*  user infomation     */}
                    <div className='flex flex-col gap-3  justify-around  w-full '>
                        <div className='w-full ' >
                            <label className="input validator w-full">
                                <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                    <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
                                        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                                        <circle cx="12" cy="7" r="4"></circle>
                                    </g>
                                </svg>
                                <input type="input" required placeholder="Full Name"
                                    minLength="3" maxLength="30"
                                    title="Only letters, numbers or dash"
                                    // name={"fullName"}
                                    value={authUser.fullName}
                                    readOnly
                                />
                            </label>
                            <p className="validator-hint hidden text-sm ">
                                Must be more then 5 charcter
                            </p>

                        </div>

                        {/* for email input */}



                        <label className="input validator w-full ">
                            <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
                                    <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                                </g></svg>
                            <input type="email" placeholder="mail@site.com" required
                                value={authUser.email}
                                readOnly />
                        </label>
                        <div className="validator-hint hidden  text-sm">Enter valid email address</div>

                    </div>

                    <div>
                        <h2 className='text-xl'>Account Information</h2>
                        <div className='flex flex-row justify-between text-sm text-base-content'>
                            <p>Member Since</p>
                            <p>
                                {
                                    Date.now()
                                }
                            </p>

                        </div>
                        <hr className='mt-2' />
                        <div className='flex flex-row justify-between mt-7 text-sm text-base-content'>
                            <p className='text-sm' >Account Status</p>
                            <p className='text-sm text-green-500 ' >
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
