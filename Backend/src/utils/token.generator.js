


import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
dotenv.config()

const jwt_Secert = process.env.JWT_SECRET

export const tokenGenerator = (_id) => {
    const token = jwt.sign({ _id }, jwt_Secert, {
        expiresIn: '7d'
    })

    

    return token;
}