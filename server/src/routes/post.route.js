import { Router } from "express"
import { addComents, CreatePost, deletePost, editPost, getAllPost, getPost, getPostWithCategory,getUserPost } from "../controller/post.controller.js";
import { athunticateJwt, isAdmin, isAdminOrAuther, isAuthor } from "../middleware/auth.middleware.js";
import upload from "../util/multer.js";

 

 const router = Router();
 
 router.post('/',upload.single("postImage"),athunticateJwt,isAuthor,CreatePost)
 router.get("/",getAllPost)
 router.patch('/edit-post/:id',upload.single("postImage"),athunticateJwt,isAuthor,editPost)
 router.get('/user-posts/:id',athunticateJwt,isAuthor,getUserPost)
 router.get('/:id',getPost)
 router.get("/post-category/:category",athunticateJwt,isAuthor ,getPostWithCategory)
router.delete('/:id',athunticateJwt,isAdminOrAuther,deletePost)
 router.post('/add-comments/:id',athunticateJwt,addComents)
 export default router;