import mongoose from "mongoose";
import Post from "../models/post.model.js";
import  {uploadToCloudinary, deleteFromCloudinary } from "../util/cloudinary.js";
import Comment from "../models/comments.model.js";

const CreatePost = async (req, res) => {
  console.log("controller here")
  console.log(req.file)
  console.log(req.body)
  const { title, description, category } = req.body;
  if (!req.file) {
    return res.status(400).json({
      message: "Files not found",
      success: false,
    });
  }
  console.log(req.file);
  if (!title?.trim() || !description?.trim() || !category.trim()) {
    res.status(400).json({
      message: "Some fields are missing",
      success: false,
    });
  }
  const postImage = req.file.path;
  console.log("postImage", postImage);
  const ImageLink = await uploadToCloudinary(postImage);

  console.log("image url", ImageLink.url);
  if (!ImageLink) {
    return res.status(400).json({
      message: "Image upload to Cloudinary failed",
      success: false,
    });
  }
  console.log("req.user", req.user);
  const post = new Post({
    title,
    description,
    author: req.user.id,
    image: ImageLink.url,
    category:category.split(","),
    status: "Published",
  });
  await post.save();
  res.status(200).json({
    message: "Post created successfully",
    success: true,
    post,
  });
};

const editPost = async (req, res) => {
  console.log("edit post",req.body)
  const { title, description, category, previousImage } = req.body;
  const postId = req.params.id;
  const files = req.files
  let ImageFile = files?.path;
  var ImageLink;
  if (!req.files || req.files.length == 0) {
    ImageLink = previousImage;
  }else{
    const files = req.files;
    ImageFile = req.files.path;
    const deleteImage = await deleteFromCloudinary(previousImage);
    console.log(deleteImage)
     ImageLink = await uploadToCloudinary(ImageFile);
    if (!ImageLink) {
      return res.status(400).json({
        message: "Image upload to Cloudinary failed",
        success: false,
      });
    }

  }
  if (!title?.trim() || !description?.trim() || !postId?.trim() || !category?.trim()  ) {
    return res.status(400).json({
  message: "Some fields are missing",
  success: false,
});
}


  const post = await Post.findById(postId);

  if (!post) {
    return res.status(400).json({
      message: "Post not found",
      success: false,
    });
  }

  post.title = title;
  post.description = description;
  post.image = ImageLink
  post.category = category.split(",")
  post.role = post.role
  
  await post.save()
console.log("post saved")

  res.status(200).json({
    message: "Sucessfully Updated data",
    success: false,
  });
};

const getAllPost = async (req, res) => {
try{
  
  const allpost = await Post.find().populate("author");

  return res.status(200).json({
    allpost,
    success: true,
  });
}catch(e){
  return res.status(401).json({
    message:"Unable to get all Post",
    success:false
  })
}
}
  const getPost = async (req, res) => {

  console.log(req.params)
  const postId = req.params.id;
const post = await Post.findById(postId)
  .populate("author", "username")
  .populate({
    path: "comments",
    populate: { path: "author", select: "username" }
  });

  console.log("post", post);
  
  if (!post) {
    return res.status(400).json({
      message: "Post with the given id not found ",
      success: false,
    });
  }

  res.status(200).json({
    post,
    success: true,
  });
};

const getPostWithCategory = async (req, res) => {
  console.log(req.params);
  const category = req.params.category;

  try {
    const posts = await Post.find({ category });
    return res.status(200).json({
      posts,
      success: true,
    });
  } catch (err) {
    return res.status(400).json({
      message: "Server error",
      success: false,
      error: err.message,
    });
  }
};
const deletePost = async (req, res) => {
  const postId = req.params.id;
  try {
    const result = await Post.deleteOne({ _id: postId });
    if (result.deletedCount == 0) {
      return res.status(400).json({
        message: "Cannot delete the Post",
        success: false,
      });
    }
    return res.status(200).json({
      message: "Deleted the Post successfully",
      success: true,
    });
  } catch (err) {
    return res.status(400).json({
      message: "Server Error While Deleting the Post",
      success: false,
      error: err.message,
    });
  }
};

const getUserPost = async (req, res) => {
  console.log("req.params");
  const userId = req.params.id;

  console.log("userId", userId);
  const posts = await Post.find({ author: userId });
  console.log("posts", posts);
  if (!posts || posts.length === 0) {
    return res.status(404).json({
      message: "No posts found for this user",
      success: false,
    });
  }
  return res.status(200).json({
    posts,
    success: true,
  });
};

const addComents = async (req, res) => {
  const { id, content } = req.body;
  const userId = req.params.id;
  console.log("req.body", req.body);
  console.log("req.params", req.params);
  const post = await Post.findById(id);
  if (!post || !post.commentsEnabled) {
    return res.status(404).json({
      message: "Post not found or comments are disabled",
      success: false,
    });
  }
  
  const comment = new Comment({
    author:userId,
    posts:post._id,
    content,
  });
  post.comments.push(comment);
  await post.save();
  await comment.save();
  res.status(201).json({ comment });
};

export {
  CreatePost,
  editPost,
  getAllPost,
  getPost,
  getPostWithCategory,
  deletePost,
  addComents,
  getUserPost,
};
