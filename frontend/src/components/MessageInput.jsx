
import React, { useRef, useState } from 'react'
import { Image, Navigation, X } from 'lucide-react'
import { useChateStore } from '../store/useChatStore';
import toast from 'react-hot-toast';
import { useAuthStore } from '../store/useAuthStore';

function MessageInput() {

    const {mode}= useAuthStore()

    const [text, setText] = useState("");
    const [imagePreview, setImagePreview] = useState(null);

    const { sendMessage } = useChateStore();
    const fileInputRef = useRef(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) {
            toast.error("please select an image")
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result);
        }
        reader.readAsDataURL(file);
    }



    const removeImage = () => {
        // console.log(fileInputRef.current.value)
        if (fileInputRef.current)
            fileInputRef.current.value = "";

        setImagePreview(null);
    }

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!text.trim() && !imagePreview)
            return

        try {
            await sendMessage({ text: text.trim(), image: imagePreview })
            setText("");
            setImagePreview(null);
            if (fileInputRef.current) fileInputRef.current.value = "";

        } catch (err) {
            console.log(err);
            toast.error("send message error")

        }


    }
    return (
        <div className={`p-4 w-full ${mode === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
            {imagePreview && (
                <div className='mb-3 flex items-center gap-2'>
                    <div className="relative">
                        <img 
                            src={imagePreview} 
                            alt="image preview"
                            className={`w-20 h-20 object-cover rounded-lg border ${
                                mode === 'dark' ? 'border-zinc-700' : 'border-zinc-300'
                            } transition-all duration-300 hover:scale-105`} 
                        />
                        <button 
                            onClick={removeImage} 
                            className={`absolute top-1.5 right-1 w-5 h-5 rounded-full hover:bg-opacity-80 ${
                                mode === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-200'
                            }`}
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            )}

            <form className='flex items-center gap-2 md:gap-3' onSubmit={handleSendMessage}>
                <div className='flex-1 flex gap-2 items-center'>
                    <input 
                        id='text' 
                        type="text" 
                        placeholder='Type a message..' 
                        className={`px-3 py-2 w-full rounded-lg outline-none transition-colors duration-200 ${
                            mode === 'dark' 
                                ? 'bg-gray-700 text-white placeholder-gray-400 focus:bg-gray-600' 
                                : 'bg-gray-100 text-gray-900 placeholder-gray-500 focus:bg-gray-200'
                        }`}
                        value={text}
                        onChange={(e) => setText(e.target.value)} 
                    />

                    <input 
                        id='image' 
                        type="file" 
                        className='hidden' 
                        ref={fileInputRef}
                        onChange={(e) => handleImageChange(e)} 
                        accept='image/*' 
                    />

                    <button 
                        type='button' 
                        className={`hidden sm:flex items-center justify-center w-10 h-10 rounded-full transition-colors duration-200 ${
                            mode === 'dark'
                                ? 'hover:bg-gray-700'
                                : 'hover:bg-gray-200'
                        } ${
                            imagePreview 
                                ? 'text-emerald-500' 
                                : mode === 'dark' ? 'text-zinc-400' : 'text-zinc-600'
                        }`}
                        onClick={() => fileInputRef.current?.click()}
                    >
                        <Image className="w-5 h-5" />
                    </button>
                </div>

                <button 
                    className={`flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200 ${
                        !text.trim() && !imagePreview
                            ? 'opacity-50 cursor-not-allowed'
                            : mode === 'dark'
                            ? 'bg-blue-600 hover:bg-blue-700'
                            : 'bg-blue-500 hover:bg-blue-600'
                    }`} 
                    type='submit'
                    disabled={!text.trim() && !imagePreview}
                >
                    <Navigation className="w-5 h-5 text-white" />
                </button>
            </form>
        </div>
    )
}

export default MessageInput
