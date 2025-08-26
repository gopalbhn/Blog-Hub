import cookieParser from "cookie-parser";
import express, { urlencoded } from "express";
import cors from 'cors';
import userRouter from './routes/user.route.js';
import postRouter from './routes/post.route.js'
import adminRouter from './routes/admin.route.js'
const app = express();
app.use(cookieParser())
app.use(cors({
    origin:["http://localhost:5173"],
    credentials:true,
    
}))
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(express.static("public"));

app.use('/api/v1/user',userRouter)
app.use('/api/v1/post',postRouter)
app.use('/api/v1/admin',adminRouter)
export {app}