
import express from 'express'
import { authLogin, authLogout, checkAuth, register, updateProfile } from '../controller/auth.controller.js';
import upload from '../config/multer.js';
import { isLogin } from '../middlware/auth.middleware.js';

const Router = express.Router();

//upload.single("image"),
Router.route("/register")
    .post(register)


Router.route("/login")
    .post(authLogin)

Router.route('/logout')
    .post(authLogout)


Router.route("/update-profile")
    .put(isLogin, updateProfile)

Router.route("/check")
.get(isLogin, checkAuth)


export default Router;