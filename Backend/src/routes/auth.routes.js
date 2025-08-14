
import express from 'express'
import { authLogin, authLogout, checkAuth, register, updateProfile } from '../controller/auth.controller.js';
import upload from '../config/multer.js';
import { isLogin } from '../middlware/auth.middleware.js';


const authRouter = express.Router();

//upload.single("image"),
authRouter.route("/register")
    .post(register)


authRouter.route("/login")
    .post(authLogin)

authRouter.route('/logout')
    .post(authLogout)


authRouter.route("/update-profile")
    .put(isLogin , updateProfile)

authRouter.route("/check")
.get(isLogin,  checkAuth)


export default authRouter;