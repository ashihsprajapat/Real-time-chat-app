
import express from 'express';
import { isLogin } from '../middlware/auth.middleware.js';
import { getMessage, getUsersForSidebar, sendMessage } from '../controller/messaage.controller.js';

const Router = express.Router()



Router.route("/users")
    .get(isLogin, getUsersForSidebar)


    //get message for a perticuler user
Router.route('/:id')
    .get(isLogin, getMessage)

Router.route("/send-message/:id")
    .post(isLogin, sendMessage)




export default Router;