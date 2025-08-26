import { Router } from "express";
import {
    registerUser,
    LoginUser,
    getUserInfo,
    changePassword,
    forgetPassword,
    LogoutUser,
    ChangeRole
    
} from "../controller/user.controller.js"
import { athunticateJwt } from "../middleware/auth.middleware.js";

const router = Router();

router.post('/register',registerUser);
router.post('/login',LoginUser)
router.get("/logout",athunticateJwt,LogoutUser)
router.get('/getInfo',athunticateJwt,getUserInfo)
router.patch("/changePassword/:id",athunticateJwt,changePassword)
router.post("/forget-password",forgetPassword)
router.put("/change-role/:id",athunticateJwt,ChangeRole)
export default router;