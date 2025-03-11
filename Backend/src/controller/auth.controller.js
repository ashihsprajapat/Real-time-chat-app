

import { tokenGenerator } from '../utils/token.generator.js';
import User from './../model/user.modle.js';
import bcrypt from 'bcrypt';
import cloudinary from 'cloudinary';


//register function with unique email , and password fullName then generate token in res.cookie
export const register = async (req, res) => {
   // console.log("register")
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

        const token = tokenGenerator(newUser._id, res)

        await newUser.save();

        res.status(200).json({
            success: true, token,
            _id: newUser._id,
            fullName: newUser.fullName,
            email: newUser.email,
            prifilePic: newUser.prifilePic,
        });

    } catch (err) {
        console.log(err)
        res.json({ success: false, message: err.message });
    }
}

// login function that check email exist and password same then generate token in res.cookie
export const authLogin = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password)
        return res.status(400).json({ success: false, message: "All details required" })

    try {

        const user = await User.findOne({ email });
        if (!user)
            return res.status(400).json({ success: false, message: "Email is not exist" })

        const match = await bcrypt.compare(password, user.password);

        if (!match)
            return res.status(400).json({ success: false, message: "Wrong password" })

        tokenGenerator(user._id, res);

        res.status(200).json({
            success: true,
            _id: user._id,
            fullName: user.fullName,
        })


    } catch (err) {
        res.json({ success: false, message: err.message })
    }
}

//logout function that delete the cookie
export const authLogout = async (req, res) => {
    try {

        res.clearCookie("token_chat_app", {
            httpOnly: true,
            sameSite: 'strict',
            secure: process.env.NODE_ENV !== 'development',
        })

        res.status(200).json({ success: true, message: "logout successfull" })

    } catch (err) {
        res.status(400).json({ success: false, message: err.message })
    }
}

//update profile with image
export const updateProfile = async (req, res) => {

    try {
        const { profilePic } = req.body;
        const userId = req.user._id;

        if (!profilePic)
            return res.status(400).json({ success: false, message: "profile pictuer required" })

        const uploadResponce = cloudinary.uploader.upload(profilePic, 1)
        console.log(uploadResponce);

        const updateUser = await User.findByIdAndUpdate(userId, { profilePic: uploadResponce.secure_url });

    } catch (err) {
        res.json({ success: false, message: err.message })
    }
}


export const checkAuth =  (req, res) => {
    try{
        res.status(200).json({user: req.user});
    }catch(err){
        res.status(500).json({success:false, message:err.message})
    }
}