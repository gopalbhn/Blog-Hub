 import jwt from 'jsonwebtoken';

 const generateJwt = (user)=>{
    const paylod = {
        id:user._id,
        email:user.email,
        role:user.role
    }

    const token =  jwt.sign(paylod,process.env.JWT_SECRET,{expiresIn:'1d'})
    return token
}

const athunticateJwt =  (req,res,next)=>{
   console.log("req.cookies",req.cookies.token)
const token = req.cookies.token 


    if(!token){
            return res.status(401).json({
                message:"Token not fournd in request",
                success:false
            })
    }
 
      jwt.verify(token,process.env.JWT_SECRET,(err,user)=>{
        if (err){
        
             res.status(401).json({
                message:err.message
             })
        }else{
            
            
            req.user = user;
            next();
        }
    })
}

const isAdmin = (req,res,next) =>{
    const token= req.cookies.token;
    if(!token){
        res.status(401).json({
            message:"Token not fournd in the Request",
        success:false,
        })
    }
    const user = jwt.verify(token,process.env.JWT_SECRET);
    if(!user){
        res.status(400)
    }
    if(user.role == "Admin"){
        next()
    }else{
        res.status(400)
    }

}

const isAuthor = (req,res,next) =>{
    console.log("req",req.user)
    // const token = req.cookie.token;
    // if(!token){
    //     res.status(401).json({
    //         message:"Token not found in Author",
    //         success:false,
    //     })
    // }
    // const user = jwt.verify(token,process.env.JWT_SECRET);
    // if(!user){
    //     res.status(400)
    // }
    if(req.user.role == "Author"){
        next()
    }else{
        return res.status(400).json({
            message:"You are not auther",
            success:false
        })
    }

}

const isAdminOrAuther = (req,res,next) =>{
    if(req.user.role == "Admin" ||req.user.role == "Auther"){
        next()

    }else{
        return res.status(400).json({
            message:"Not the admin or auther",
            success:false
        })
    }

}
export {generateJwt,athunticateJwt,isAuthor,isAdmin,isAdminOrAuther} 
