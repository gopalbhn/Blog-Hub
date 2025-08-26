import User from "../models/user.model.js";

 const SeedAdmin  = async ()=> {
    const username = "adminuser";
    const email  = "admin@gmail.com"
    const pass = "admin123"

    const existingAdmin = await User.findOne({email})
    if(existingAdmin){
        console.log("Admin already exists")
        return;
    }
    const admin = new User()
    admin.username = username;
    admin.email = email;
    admin.password = pass;
    admin.role = "Admin"
    await admin.save();
    console.log("Admin seeded successfully")
 }

 export default SeedAdmin;