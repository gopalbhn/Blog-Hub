import axios from 'axios';
import React,{useState,useEffect} from 'react'
import api from '../../api/apiProvider';
import Loader from '../../components/Loader';
import { PiPen,PiTrash } from 'react-icons/pi';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

const AllPost = () => {
    const [posts,setPosts] = useState([]);
    const[loading,setLoading] = useState(true)
    const navigate = useNavigate()
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const res = await axios.get(api.getAllPost.url, {
          withCredentials: true,
        });

        if (res.status !== 200) {
          console.log("Unable to get posts");
        } else {
          setPosts(res.data.allpost);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

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

  if(loading){
    return <Loader />
  }
  return (
    <div className='min-h-[90vh] w-full px-15 py-5 dark:bg-black dark:text-white'>
        <ToastContainer />
       {posts.length > 0 && (
           <h1 className='text-3xl text-center'> All Posts</h1>

       )}
        {posts.length == 0 && (
            <div className='mt-10 ml-10 text-2xl text-center'> No Post Found</div>
        )}
        { posts.length > 0 && posts.map(post=>
        <>{
            console.log("posts",post)
        }
            <li
            key={post.createdAt}
            className="p-4 mt-4 h-[110px] bg-white dark:bg-[#1c1c1c] rounded-md shadow-md group relative list-none"
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
 <div>
            Post by : {post.author.username}
           </div>
            <button
              className="absolute top-5 right-3 p-2 rounded-full bg-red-600 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-red-700 hover:cursor-pointer"
              onClick={() => handleDelete(post._id)}
              >
              <PiTrash className="text-lg" />
            </button>
          
          </li>
                </>
        )}
    </div>
  )
}

export default AllPost