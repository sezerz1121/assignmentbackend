import mongoose from "mongoose";


const historySchema = new mongoose.Schema
(
    {

        file:
        {
            type:String,
            required:true
        }
    },
    {
        timestamps:true
    }
)

export const History =  mongoose.model("History",historySchema);