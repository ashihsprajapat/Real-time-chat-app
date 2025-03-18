

import { tokenGenerator } from '../utils/token.generator.js';
import User from './../model/user.modle.js';
import bcrypt from 'bcrypt';
import cloudinary from 'cloudinary';


//register function with unique email , and password fullName then generate token in res.cookie
export const register = async (req, res) => {

    const { email, password, fullName } = req.body;

    if (!email || !password || !fullName)
        return res.status(400).json({ success: false, message: "missing details" })

    try {

        const user = await User.findOne({ email })

        if (user)
            return res.status(400).json({ success: false, message: "emil already exist" })

        if (password.length < 6)
            return res.status(400).json({ success: false, message: "password must have 6 character" })

        const image = req.file;

        const hashPassword = await bcrypt.hash(password, 10);


        const newUser = new User({
            email, fullName, password: hashPassword, //profilePic: image.secure_url,
        })

        if (!newUser)
            return res.status(400).json({ success: false, message: "Invalid user data" })

        const token = tokenGenerator(newUser._id)

        await newUser.save();

        res.status(200).json({
            success: true, token,
            _id: newUser._id,
            fullName: newUser.fullName,
            email: newUser.email,

        });

    } catch (err) {
        // console.log(err)
        res.json({ success: false, message: err.message, token });
    }
}

// login function that check email exist and password same then generate token in res.cookie
export const authLogin = async (req, res) => {
    const { email, password } = req.body;
    //console.log(email, password)

    if (!email || !password)
        return res.status(400).json({ success: false, message: "All details required" })

    try {

        const user = await User.findOne({ email });
        if (!user)
            return res.status(400).json({ success: false, message: "Email is not exist" })

        const match = await bcrypt.compare(password, user.password);

        if (!match)
            return res.status(400).json({ success: false, message: "Wrong password" })

        const token = tokenGenerator(user._id);

        res.status(200).json({
            success: true,
            _id: user._id,
            fullName: user.fullName,
            profilePic: user.profilePic,
            email: user.email,
            token
        })


    } catch (err) {
        console.log(err)
        res.json({ success: false, message: err.message })
    }
}

//logout function that delete the cookie
export const authLogout = async (req, res) => {
    try {
        // Clear the cookie by setting it with a past expiration date and zero maxAge
        console.log('cookie chat-app-jwt ', req.cookie)
        res.clearCookie("token_chat_app", {
            httpOnly: true, // Ensures client-side JS can't access the cookie
            sameSite: 'None', // Allow cross-site cookies (if necessary)
            secure: process.env.NODE_ENV === 'production', // Set secure cookies only in production
        });

        res.status(200).json({ success: true, message: "Logout successful" });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

//update profile with image
export const updateProfile = async (req, res) => {
    // console.log("profile update")
    try {
        const profilePic = req.file;
        //  console.log(profilePic)
        const userId = req.user._id;

        const user = await User.findById(userId);

        if (!user)
            return res.status(400).json({ message: "user not found", success: false });

        if (!profilePic)
            return res.status(400).json({ success: false, message: "profile pictuer required" })

        const uploadResponce = cloudinary.uploader.upload(profilePic.path)
        //  console.log(uploadResponce);

        const updateUser = await User.findByIdAndUpdate(userId, { profilePic: uploadResponce.secure_url });

        res.status(200).json({ success: true, user: updateUser })

    } catch (err) {
        res.json({ success: false, message: err.message })
    }
}


export const checkAuth = (req, res) => {
    try {
        res.status(200).json({ success: true, user: req.user });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message })
    }
}