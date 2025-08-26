 import  mongoose, { Schema,model } from "mongoose";
 
import bcrypt from "bcryptjs";
 const userSchema =  new Schema({
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    username:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:["Admin","Author","Reader"],
        default:"Reader"
    } 

 },{timestamps:true}) 

userSchema.methods.comparePassword = async function (candidatePassword) {
    
    return await bcrypt.compare(candidatePassword,this.password)
 }

 userSchema.pre("save",async function (next){
    if(!this.isModified("password")) return next()
        this.password = await bcrypt.hash(this.password,10)
        return next();
 })

 const User =   mongoose.model("User",userSchema)

 export default User;