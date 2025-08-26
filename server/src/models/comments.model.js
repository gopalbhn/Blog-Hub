import mongoose, { Schema } from "mongoose";

 
const commentSchema = new Schema({
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },

    posts:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Post",
        required:true
    },
    content:{
        type:String,
        required:true
    }
},{timestamps:true})

const Comment = mongoose.model("Comment",commentSchema);;

export default Comment