 import mongoose, { Schema,model } from "mongoose";

 const postSchema = new Schema({
    title:{
        type:String,
        requried:true,

    },
    description:{
        type:String,
        required:true
    },
    category:{
        type:[String],
        required:true
    },
    tags:{
        type:[{String}],
        required:true
    },
    image:{
        type:String,
        required:true
    },
    status:{
        type:String,
        enum:["Draft","Published"],
        default:"Draft"
    },
    commentsEnabled:{
        type:Boolean,
        default:true,
        required:true
    },
    comments:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:"Comment",
        default:[]
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    }
 },{timestamps:true})

 const Post = model("Post",postSchema);
 export default Post