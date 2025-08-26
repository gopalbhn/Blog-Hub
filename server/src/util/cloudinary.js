import {v2 as cloudinary} from 'cloudinary'
console.log("api key",process.env.API_KEY)

cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret:process.env.API_SECRET,
    
})
 const uploadToCloudinary = async (filePath)=>{

    cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret:process.env.API_SECRET,
    
})
     try{
        console.log("filePath",filePath);
         const image = await cloudinary.uploader.upload(filePath);
         return image
    }catch(err){
        console.log("Error Occured while uploading file to Cloudinary",err);
        throw err;
    }
        
 }

 async function deleteFromCloudinary(id){
    try{
        const res = await cloudinary.uploader.destroy(id)
        console.log(res)
        return ;
    }catch(err){
        console.log("Error:",err)
    }
 }
 export  {uploadToCloudinary,deleteFromCloudinary};