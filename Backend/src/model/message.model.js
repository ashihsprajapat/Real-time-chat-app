
import User from "./user.modle.js";
import mongoose,{Schema,model} from "mongoose";

const messageSchema= new Schema({
    senderId:{
        type: Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    reciverId:{
        type: Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    text:{ type:String},
    image:{type:String},
},{timestamps:true})

const Message= model("Message", messageSchema);

export default Message;
