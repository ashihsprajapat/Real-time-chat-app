
import jwt from 'jsonwebtoken'
import User from '../model/user.modle.js';

export const isLogin = async (req, res, next) => {
    try {

        const token = req.headers.token;
       // console.log(token)
        if (!token)
            return res.status(400).json({ success: false, message: "not login" })

        const decode = await jwt.verify(token, process.env.JWT_SECRET);
       // console.log(decode);
        const user = await User.findById(decode._id).select("-password")
        //  console.log(user)

        if (!user)
            return res.status(400).json({ success: false, message: "user not found" })

        req.user = user;
       // console.log(req.user)
        next();

    } catch (err) {
        res.status(400).json({ success: false, message: err.message })
    }
}