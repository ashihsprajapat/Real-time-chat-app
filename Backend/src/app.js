

import dotenv from "dotenv";
dotenv.config();
import express from 'express';
import cookieParser from 'cookie-parser'
import cors from 'cors'

import mognooseConnection from "./config/mongodb.js";

//user Router
import userAuth from "./routes/auth.routes.js"

//message Router 
import messageRouter from './routes/message.route.js'

///for cloudinary setUp
import cloudinaryConnection from "./config/cloudinary.connection.js";

const app = express();

const allowedOrigins = ['http://localhost:5173'];

app.use(cors({
    origin: (origin, callback) => {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) { // !origin is for same-origin requests (e.g., Postman)
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,  // Enable cookies and authorization headers
}));

app.use(express.json());

app.use(cookieParser());




const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("App is listing on port", PORT);
})

await mognooseConnection()
    .then(() => console.log("Connect to data base"))
//.catch((err)=>console.log(err))

await cloudinaryConnection();

app.get("/", (req, res) => {
    res.json({ Run: "Good" });
})

//router for authentication
app.use("/api/auth", userAuth)

//route for message
app.use("/api/message", messageRouter)