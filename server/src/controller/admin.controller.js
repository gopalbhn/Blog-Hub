
import Post from "../models/post.model.js";
import User from "../models/user.model.js"
import Comment from "../models/comments.model.js";



 const getAllUser = async (req,res)=>{
    const user = await User.find().select("-password");
    if(!user){
        res.status(401).json({
            message:"Unable to find all user",
            succes:false
        })
    }
    res.status(200).json({
        user,
        success:false
    })
}

const deleteUser = async (req,res) =>{
    console.log(req.params.id)
    const UserId = req.params.id;
    console.log(UserId)
    if(!UserId){
        return res.status(400).json({
            message:"Send User Id",
            success:false
        })
    }
    try{

        const post = await Post.deleteMany({author:UserId});
        if(post){
        await Comment.deleteMany({author:UserId})
        let  user = await User.findByIdAndDelete(UserId);
         if(user){
            return res.status(200).json({
                message:"Sucessfully Deleted User",
                success:true
            })
        }else{
            return res.status(400).json({
                message:"Error in Deleting  User",
                success:false
            })
        }
        } 
     
       
    }catch(err){
        return res.status(400).json({
            message:"Error in server",
            
            success:false
        })
    }
        
}

export {getAllUser,deleteUser}