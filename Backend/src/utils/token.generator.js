


import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
dotenv.config()

const jwt_Secert = process.env.JWT_SECRET

export const tokenGenerator = (_id) => {
    const token = jwt.sign({ _id }, jwt_Secert, {
        expiresIn: '7d'
    })

    // res.cookie("token_chat_app", token, {
    //     expire: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    //     maxAge: 7 * 24 * 60 * 60 * 1000,
    //     httpOnly:true,
    //     sameSite:'None',
    //     secure: process.env.NODE_ENV !== 'developement',
    // })

    return token;
}