import User from "../models/user.model.js";

import { generateJwt } from "../middleware/auth.middleware.js";

const registerUser = async (req, res) => {
  const { email, username, password } = req.body;
  console.log(email,username,password)
  if (!email?.trim() || !username?.trim() || !password.trim()) {
    return res.status(401).json({
      message: "Some Fields are missing",
      success: false,
    });
  }
  const ExistingUser =  await User.findOne({ email });
  if (ExistingUser) {
      return res.status(401).json({
      message: "User with the Email Already Exists",
      success: false,
    });
  }

  const ExistingUserName = await  User.findOne({ username });
  if (ExistingUserName) {
    return res.status(401).json({
      message: "User with the given username already exists",
      success: false,
    });
  }

  const newUser = new  User({
    email,
    username,
    password,
    role: "Author",
  });
   await newUser.save();
  const token = generateJwt(newUser);
  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "none",
    maxAge: 24 * 60 * 60 * 1000,
  });

  res.status(200).json({
    message: "User registerd sucessfully",
    success: true,
  });
};

const LoginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email?.trim() || !password?.trim()) {
    return res.status(400).json({
      message: "Some field are missing",
      success: false,
    });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({
      message: "Invalid Credentials",
      success: false,
    });
  }
 
  const isPasswordCorrect = await user.comparePassword(password)
  console.log(isPasswordCorrect)
  if (!isPasswordCorrect) {
    return res.status(400).json({
      message: "Given Password is not correct",
      success: false,
    });
  }
  const token = generateJwt(user);
   

       res.cookie("token", token, {
        httpOnly: true,
        
        maxAge: 1 * 24 * 60 * 60 * 1000,
        secure: false,
      });
  
    res.status(200).json({ message: "Successfully logged in", success: true });
};

const LogoutUser = async(req,res)=>{
      return res.cookie("token","",{maxAge:0}).json({
        message: "Successfully logged out",
        success: true,
      })
}

const getUserInfo = async (req, res) => {
  console.log('control here user info')
  try {
    console.log(req.user)
    const user = await User.findOne({email:req.user.email}).select("-password");
    return res.status(200).json({
      user,
      success: true,
    });
  } catch (err) {
    return res.status(400).json({
      message: "error occured",
      success: false,
    });
  }
};


const changePassword = async(req,res) =>{
  const {oldpassword,newpassword} = req.body;
  const id = req.params.id
  console.log("id",id)
  if(!oldpassword?.trim() || !newpassword?.trim()){
      return res.status(400).json({
        message:"Some feild are missing",
        success:false
      })
  }
  const user = await User.findById(id)
 
if (!user) {
  return res.status(404).json({
    message: "User not found",
    success: false,
  });
}
  const isPasswordCorrect = await user.comparePassword(oldpassword);
  if(!isPasswordCorrect){
    return res.status(400).json({
      message:"Old password is not correct",
      success:false
    })
  }

  user.password = newpassword;
  await user.save();
  return res.status(200).json({
    message:"Password is updated successfully",
    success:true
  })
}
const forgetPassword = (req, res) => {
  const { email } = req.body;
  if (!email.trim()) {
    return res.status(400).send({
      messsage: "Email field is missing",
      success: false,
    });
  }
  const userDetail = User.find({ email });
  if (!userDetail) {
    return res.status(400).send({
      message: "User does not exists",
      success: false,
    });
  }

  const code = Math.random().toString(36).substring(2,8)


};
const ChangeRole = async (req,res) =>{
  const {  role } = req.body;
  const userId = req.params.id;
  const newRole = role || "Author"; 
  console.log("userId",userId)
  if (!userId.trim() || !newRole.trim()) {
    return res.status(400).json({
      message: "User ID and new role are required",
      success: false,
    });
  }

  const user = await User.findById(userId);
  console.log("user",user)
  if (!user) {
    return res.status(404).json({
      message: "User not found",
      success: false,
    });
  }

  user.role = newRole;
  await user.save();

  res.status(200).json({
    message: "User role updated successfully",
    success: true,
  });
}
export { registerUser, LoginUser,LogoutUser, getUserInfo,changePassword,forgetPassword,ChangeRole };
