
import express from 'express';
import { isLogin } from '../middlware/auth.middleware.js';
import { getMessage, getUsersForSidebar, sendMessage } from '../controller/messaage.controller.js';

const Router = express.Router()


//get users for sidebar in frontend
Router.route("/users")
    .get(isLogin, getUsersForSidebar)


    //get message for a perticuler user
    //get message for selected users
Router.route('/:id')
    .get(isLogin, getMessage)

Router.route("/send-message/:id")
    .post(isLogin, sendMessage)




export default Router;