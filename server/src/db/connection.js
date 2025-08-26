import mongoose from "mongoose";
import SeedAdmin from "../util/seedAdmin.js";

const ConnectDB = async  ()=>{
    try{
        console.log("Starting mongodb connection ............");
        console.log(process.env.MONGODB_URI)
        const ConnectionInstance = await  mongoose.connect(process.env.MONGODB_URI);
        await SeedAdmin();
        console.log("connection sucessfully")  
    }catch(err){
        console.log("Error in connecting to mongodb",err)
    }
}


export default ConnectDB;