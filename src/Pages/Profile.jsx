import axios from "axios";
import React, { useEffect, useState } from "react";
import { PiPen, PiTrash } from "react-icons/pi";
import api from "../api/apiProvider";
import { useAuth } from "../context/authProvider";
import { toast, ToastContainer } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

export const Profile = () => {
  const { auth } = useAuth();
  const [userDetails, setUserDetails] = useState(null);
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchUserData = async () => {
      console.log("auth", auth);
      if (auth && auth.userData) {
        const { _id } = auth.userData;
        setUserDetails(auth.userData);
        fetchPosts(_id);
      } else {
        console.log("User not authenticated or userData not available.");
      }
    };

    const fetchPosts = async (userId) => {
      if (userId) {
        try {
          const response = await axios.get(
            api.getUserPosts.url + "/" + userId,
            {
              withCredentials: true,
            }
          );
          if (response.status === 200) {
            setPosts(response.data.posts);
            setLoading(false);
          }
        } catch (error) {
          console.error("Error fetching posts:", error);
        }
        finally {
          setLoading(false);
        }
      }
    };

    fetchUserData();
  }, [auth]);

  const handleDelete = async (postId) => {
    try {
      const response = await axios.delete(api.deletePost.url + "/" + postId, {
        withCredentials: true,
      });
      if (response.status === 200) {
        toast.success("Post deleted successfully");
        setPosts((prevPosts) =>
          prevPosts.filter((post) => post._id !== postId)
        );
      } else {
        toast.error("Failed to delete post");
      }
    } catch (error) {
      console.error("Error deleting post:", error);
      toast.error("Error deleting post");
    }
  };

  const ChangeRole = async (newRole) => {
    try {
      const response = await axios.put(
        api.changeRole.url + "/" + userDetails._id,
        { role: newRole },
        { withCredentials: true }
      );

      if (response.status === 200) {
        toast.success("Role changed successfully");
        window.location.reload()

      } else {
        toast.error("Failed to change role");
      }
    } catch (error) {
      console.error("Error changing role:", error);
      toast.error("Error changing role");
    }
  };
  console.log("userDetails", userDetails);
  if(loading){
    return <Loader />
  }
  return (
    <div className="min-h-screen w-full bg-white dark:bg-black dark:text-white flex flex-col items-center py-10">
      <div className="w-[400px] rounded-xl shadow-md dark:shadow-white p-6 bg-white dark:bg-[#1c1c1c]">
        <ToastContainer />
        <div className="h-[40px] mt-4 flex items-center gap-3 px-2 py-1 rounded-xl bg-white dark:bg-[#19191a]">
          <span className="capitalize w-[80px]">Username</span>

          <p className="h-full w-full rounded-xl px-2 bg-transparent">
            {userDetails?.username}
          </p>
        </div>
        <div className="h-[40px] mt-4 flex items-center gap-3 px-2 py-1 rounded-xl bg-white dark:bg-[#19191a]">
          <span className="capitalize w-[80px]">Email</span>
          <p className="h-full w-full rounded-xl px-2 bg-transparent">
            {userDetails?.email}
          </p>
        </div>
        <div className="h-[40px] mt-4 flex items-center gap-3 px-2 py-1 rounded-xl bg-white dark:bg-[#19191a]">
          <span className="capitalize w-[80px]">Role</span>
          <select
            value={userDetails?.role}
            name="role"
            id="role"
            className="h-full w-full rounded-xl px-2 bg-transparent"
            onChange={(e) => ChangeRole(e.target.value)}
          >
            <option
              value="Reader"
              className="bg-white text-black dark:bg-black dark:text-white"
            >
              Reader
            </option>
            <option
              value="Author"
              className="bg-white text-black dark:bg-black dark:text-white"
            >
              Author
            </option>

            <option
              value="Admin"
              className="bg-white text-black dark:bg-black dark:text-white"
            >
              Admin
            </option>
          </select>
        </div>
        <div className="h-[40px] mt-4 flex items-center gap-3 px-2 py-1 rounded-xl bg-white dark:bg-[#19191a] justify-center">
          <Link to={`/change-password/${userDetails?._id}`} className=" h-[30px] w-[200px] text-center bg-white text-black"> Change Password </Link>
        </div>
      </div>

      <div className="w-full max-w-3xl mt-10 px-4">
        <h2 className="text-xl font-semibold mb-4">
          Posts by {userDetails?.username}
        </h2>
        {posts.map((post) => (
          <li
            key={post._id}
            className="p-4 mt-3 h-[85px] bg-white dark:bg-[#1c1c1c] rounded-md shadow-md group relative list-none"
          >
            <h3 className="font-bold text-lg">{post.title}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {post.description.length > 100
                ? post.description.slice(0, 100) + "..."
                : post.description}
            </p>
            <p className="text-sm text-gray-500">
              {new Date(post.createdAt).toLocaleDateString()}
            </p>

            <button
              className="absolute top-1 right-3 p-2 rounded-full bg-red-600 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-red-700 hover:cursor-pointer"
              onClick={() => handleDelete(post._id)}
            >
              <PiTrash className="text-lg" />
            </button>
            <button
              className="absolute top-13 right-3 p-2 rounded-full bg-green-500 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-green-400 hover:cursor-pointer"
              onClick={()=>navigate(`/edit-post/${post._id}`)}
            >
              <PiPen />
            </button>
          </li>
        ))}
      </div>
    </div>
  );
};

export default Profile;
