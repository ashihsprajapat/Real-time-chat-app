
import React, { useRef, useState } from 'react'
import { Image, Navigation, X } from 'lucide-react'
import { useChateStore } from '../store/useChatStore';
import toast from 'react-hot-toast';

function MessageInput() {


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
        if (!text.trim() && imagePreview)
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
        <div className='p-4 w-full' >
            {
                imagePreview && (
                    <div className='mb-3 flex items-center gap-2' >
                        <div className="relative">
                            <img src={imagePreview} alt=" image previe"
                                className='w-20 h-20 object-cover rounded-lg border border-zinc-700' />
                            <button onClick={removeImage} className='absolute top-1.5 right-1 w-5 h-5 ' >
                                <X />
                            </button>
                        </div>

                    </div>
                )
            }

            <form action="" className='flex items-center gap-2' onSubmit={handleSendMessage} >

                <div className='  flex-1 flex gap-2  gap-2 items-center '>

                    <input id='text' type="text" placeholder='Type a message..' className='px-2 outline-none py-1.5 w-full input input-bordered rounded-lg input-sm sm '
                        value={text}
                        onChange={(e) => setText(e.target.value)} />



                    <input id='image' type="file" className='hidden' ref={fileInputRef}
                        onChange={(e) => handleImageChange(e)} accept='image/*' />

                    <button type='button' className={`hidden  sm:flex bnt btn-circle
                        ${imagePreview ? 'text-emerald-500' : "text-zinc-400"} `}
                        onClick={() => fileInputRef.current?.click()} >
                        <Image />
                    </button>




                </div>
                <button className='btn  btn-circle btn-sm' type='submit'
                    disabled={!text.trim() && !imagePreview}>
                    <Navigation />
                </button>

            </form>
        </div>
    )
}

export default MessageInput
