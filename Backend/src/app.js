

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

import { server, app, io } from "./config/socket.js";

import path from 'path';


const allowedOrigins = ['http://localhost:5173'];

// app.use(cors({
//     origin: '*',
//     credentials: true,  // Enable cookies and authorization headers

// }));

app.use("/api/auth/login", (req, res, next) => {
    console.log(req.body)
    next()
})

app.use(cors({
    origin: (origin, callback) => {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,

}));

app.use(express.json());

app.use(cookieParser());




const PORT = process.env.PORT || 3000;

const __dirname = path.resolve();

server.listen(PORT, () => {
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

app.use("/api/messages", messageRouter)


// if (process.env.NODE_ENV === "production") {
//     app.use(express.static(path.join({ __dirname: "../../frontend/dist" })))

//     app.get("*", (req, res) => {
//         res.sendFile(path.join(__dirname, "../../frontend", "dist", "index.html"))
//     })
// }
if (process.env.NODE_ENV === "production") {
    // Serve the frontend build files from the 'dist' directory
    app.use(express.static(path.join(__dirname, "../frontend/dist")));

    // Handle all routes by sending the index.html file
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
    });
}