

import mongoose,{Schema, model} from "mongoose";

const userSchema= new Schema({
    email:{type:String, required:true, unique:true},
    fullName:{type:String, required:true,},
    password:{type:String, required:true, minlength:6 },
    profilePic:{
        type:String,
        default:""
    },

})

const User= model("User", userSchema);

export default User;