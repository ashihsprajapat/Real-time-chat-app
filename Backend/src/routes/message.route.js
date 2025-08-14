
import express from 'express';
import { isLogin } from '../middlware/auth.middleware.js';
import { getMessage, getUsersForSidebar, sendMessage } from '../controller/messaage.controller.js';

const messageRouter = express.Router()


//get users for sidebar in frontend
messageRouter.route("/users")
    .get(isLogin, getUsersForSidebar)


    //get message for a perticuler user
    //get message for selected users
messageRouter.route('/:id')
    .get(isLogin, getMessage)

messageRouter.route("/send-message/:id")
    .post(isLogin, sendMessage)




export default messageRouter;