import User from "../model/user.modle.js";
import Message from './../model/message.model.js';
import cloudinary from 'cloudinary';


export const getUsersForSidebar = async (req, res) => {
    try {

        const logedInUserId = req.user._id;

        const filterUsers = await User.find({ _id: { $ne: logedInUserId } }).select("-password")

        res.status(200).json({ success: true, user: filterUsers })

    } catch {
        console.log(err.message)
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}

export const getMessage = async (req, res) => {

    try {
        const { id: userToChatId } = req.params;
        console.log(id);

        const myId = req.user._id;
        console.log(id);

        const mesage = await Message.find({
            $or: [
                { senderId: myId, reciverId: userToChatId },
                { senderId: userToChatId, reciverId: myId }
            ]
        })

        res.status(200).json({ message });

    } catch (err) {
        console.log(err.message)
        res.status(500).json({ success: false, message: "Internal error" })
    }
}


export const sendMessage = async (req, res) => {
    try {
        const senderId = req.user._id;

        const { id: reciverId } = req.params;

        const { text, image } = req.body;

        let imageUrl;

        if (image) {
            let uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }

        const newMessage = new Message({
            senderId,
            reciverId,
            text,
            image: imageUrl,
        })

        await newMessage.save();


        //todo real time functionality  goes here=> socket.io

        res.status(200).json({ success: true, newMessage })


    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: "Internal error" })
    }
}