
import React, { useRef, useState } from 'react'
import {Image,Navigation} from 'lucide-react'
import { useChateStore } from '../store/useChatStore';

function MessageInput() {

    const [text, setText]= useState("");
    const [imagePreview, setImagePreview]= useState(null);

    const {sendMessage}= useChateStore();
    const fileInputRef= useRef(null);
    return (
        <div className='w-full border flex flex-col-reverse md:flex-row md:gap-10 items-center fixed'>
        <label htmlFor="text" className=' my-0  w-full md:w-5/6' >
            <input id='text' type="text" placeholder='Type a message..' className='px-2 outline-none py-1.5 w-full ' />

        </label>
        <div className='flex flex-row gap-10 border my-0 '>
            <label htmlFor="image">
                <Image />
                <input id='image' type="file" className='hidden' />
            </label>
            <button>
                <Navigation />
            </button>
        </div>


    </div>
    )
}

export default MessageInput
