

import dotenv from "dotenv";
dotenv.config();
import express from 'express';
import cookieParser from 'cookie-parser'
import cors from 'cors'



import { server, app, io } from "./src/config/socket.js";

import path from 'path';
import authRouter from "./src/routes/auth.routes.js";
import messageRouter from "./src/routes/message.route.js";
import mognooseConnection from './src/config/mongodb.js';





app.use(express.json({ limit: '10mb' }));

const allowedOrigins = ['http://localhost:5173', 'https://real-time-chat-app-tdp4-c7khobixl-ashish-prajapats-projects.vercel.app']; // Add production domain here


//app.use("/*", (req, res, next) => { console.log(req); next() })

app.use(cors({
    origin: (origin, callback) => {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,  // Allow credentials (cookies) to be sent
}));


app.use(express.urlencoded({ extended: true, limit: '10mb' }))
app.use(cookieParser());




const PORT = process.env.PORT || 3000;

const __dirname = path.resolve();

server.listen(PORT, () => {
    console.log("App is listing on port", PORT);
})

await mognooseConnection()
    .then(() => console.log("Connect to data base"))
//.catch((err)=>console.log(err))

//await cloudinaryConnection();

app.get("/", (req, res) => {
    res.send("ok working")
})

app.get("/api/test", (req, res) => { res.send("Ok its working") })

//router for authentication
app.use("/api/auth", authRouter)

//route for message

app.use("/api/messages", messageRouter)



if (process.env.VITE_MODE === "production") {
    // Serve the frontend build files from the 'dist' directory
    app.use(express.static(path.join(__dirname, "../frontend/dist")));

    // Handle all routes by sending the index.html file
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
    });
}