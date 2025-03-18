

import mongoose, { Schema, model } from "mongoose";
import User from "./user.modle.js";

const connectionsSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: User },
    connections: [
        {
            type: Schema.Types.ObjectId,
            ref: User,
        }
    ]
})

const Connections = model("Connections", connectionsSchema);

export default Connections