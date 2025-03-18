

import { Server } from 'socket.io'
import http from 'http'



import express from 'express'

const app = express()
const server = http.createServer(app);

const io = new Server(server, {
    cors: ["http://localhost:5173"]
},)

// used to store online user

const userSocketMap = {  // {userId : socket.id}

}
console.log("online users is ", userSocketMap);

export const getReciveSocketId = (userId) => {
    return userSocketMap[userId];
}


io.on("connection", (socket) => {
    console.log("A user Connect to user", socket.id)

    const userId = socket.handshake.query.userId;

    if (userId) {

        userSocketMap[userId] = socket.id;  // store the socket.id as userId in userSocketMap 

    }

    // io.emit() is used to send events to all connected clients this msg send to all 
    io.emit("getOnlineUser", Object.keys(userSocketMap))


    socket.on("disconnect", () => {
        console.log(" A User disconnect ", socket.id)
        delete userSocketMap[userId];  //after disconnect the  socket.id is remove from userSocketMap
        io.emit("getOnlineUser", Object.keys(userSocketMap))  // resend to it after delete
    })
})


export { io, app, server }

