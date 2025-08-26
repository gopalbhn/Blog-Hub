import axios from "axios";
import { useEffect, useState } from "react";
import {
  FaUser,

  FaComment,
} from "react-icons/fa";
import api from "../api/apiProvider";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/authProvider";
import { toast, ToastContainer } from "react-toastify";

const ReadBlog = () => {
  const [blogPost, setBlogPost] = useState(null);
  const [commentText, setCommentText] = useState("");
  const [showComments, setShowComments] = useState(false);
  const { id } = useParams();
  const { auth } = useAuth();
  let UserId  = auth?.userData?._id || null;


  useEffect(() => {
 
    async function fetchPost() {
      console.log("Fetching post with ID:", UserId);
      try {
        const res = await axios.get(api.getOnepost.url + id, {
          withCredentials: true,
        });

        if (res.status === 200) {
          setBlogPost(res.data.post);
        } else {
          console.error("Failed to fetch blog post");
        }
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    }
    fetchPost();
  }, [id]);

  const handleCommentSubmit =async  () => {
    if (commentText.length < 15) return;

    const newComment = {
      id,
      content: commentText,
    };
      const res = await axios.post(api.addComment.url+UserId, newComment, {
      withCredentials: true,
    });
    if (res.status != 201) {
        toast.error("Failed to add comment");
      return;
    }{
      toast.success("Comment added successfully");
      setTimeout(()=>{
        window.location.reload()
      },2000)
    }
  
    if (!blogPost) return; 

    if (!blogPost.comments) {
      blogPost.comments = []; 
    }
  
  };

  
  if (!blogPost) {
    return <div className="p-6 text-center text-gray-500 dark:bg-black h-[100vh] w-full">Loading post...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50  dark:bg-black dark:text-white  ">
      <ToastContainer />
      <main className="max-w-4xl mx-auto px-4 py-8">
        <article className="bg-white rounded-lg shadow-md dark:shadow-white  p-6 dark:bg-black dark:text-white">
          <h1 className="text-3xl font-bold  mb-2">{blogPost.title}</h1>
          <div className="flex items-center space-x-2 text-sm text-gray-500 mb-4">
            <span>By {blogPost.author.username}</span>
            <span>·</span>
            <span>{blogPost.date}</span>
          </div>
          <div className="mb-4 h-[300px]  w-[400px] mx-auto">
            <img
              src={blogPost.image}
              alt={blogPost.title}
              className="w-full h-auto max-h-[300px] rounded-lg"
            />
          </div>
          <div className=" mb-6 text-justify">{blogPost.description}</div>
          
          <div className="flex items-center space-x-4  border-b border-gray-100 py-4 mb-6">
            <div className="flex items-center space-x-1">
              <FaComment />

              <button
                className="hover:cursor-pointer"
                onClick={() => {
                  if (
                    auth?.userData?.username !== undefined &&
                    auth?.userData?.role === "Reader"
                  ) {
                    setShowComments(!showComments);
                  } else {
                    alert("Please login to comment");
                    window.location.href = "/login";
                  }
                }}
              >
                Comments
              </button>
              {console.log("blogPost.comments", blogPost.comments)}
            </div>
          </div>
          {showComments && (
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Leave a Comment</h2>
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-full dark:bg-white flex items-center justify-center text-indigo-600">
                  <FaUser />
                </div>
                <div className="flex-1">
                  <textarea
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none"
                    placeholder="Share your thoughts... (minimum 15 characters)"
                    rows="3"
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                  />
                  <div className="flex justify-between items-center mt-2">
                    <span
                      className={`text-sm ${
                        commentText.length >= 15
                          ? "text-green-600"
                          : "text-gray-500"
                      }`}
                    >
                      {commentText.length}/15 characters
                    </span>
                    <button
                      className={`px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors ${
                        commentText.length < 15
                          ? "opacity-50 cursor-not-allowed"
                          : ""
                      }`}
                      disabled={commentText.length < 15}
                      onClick={handleCommentSubmit}
                    >
                      Post Comment
                    </button>
                  </div>
                </div>
              </div>
              {console.log("comments", blogPost.comments)}
            </section>
          )}
          
            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Comments ({blogPost.comments.length})
              </h2>
              <div className="space-y-6">
                {blogPost.comments.map((comment, index) => (
                  <AllComments
                    key={index}
                    comments={comment.content}
                    user={comment.author.username}
                    date={comment.createdAt}
                  />
                ))}
              </div>
            </section>
    
        </article>
      </main>
    </div>
  );
};


function AllComments({comments,user,date}) {
  return (
    <div className="flex items-center space-x-2">
      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600">
        <div>

        <FaUser />
        
        </div>
        
      </div>
      <div className="flex-1 dark:text-white ">
        <p>{user}</p>
        <p >{comments}</p>
        
        <span className="text-sm ">{new Date(date).toLocaleString()}</span>
      </div>
    </div>
  );
}


export default ReadBlog;
