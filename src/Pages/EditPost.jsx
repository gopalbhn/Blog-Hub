import axios from "axios";
import { useState,useEffect } from "react";
import {
  FaCloudUploadAlt,
  FaPlus,
  FaTimes,
  FaPaperPlane,
} from "react-icons/fa";
import api from "../api/apiProvider";
import { useAuth } from "../context/authProvider";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { ToastContainer,toast } from "react-toastify";

const EditPost = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState([]);
  const [previewImage, setPreviewImage] = useState("");
  const navigate = useNavigate();
  const { auth } = useAuth();
  const postId = useParams().id;

  useEffect(()=>{
        async function fetchPost(){
          
          try{

            const res = await axios.get(api.getOnepost.url + postId,{
              withCredentials:true
            })

            console.log(res.data.post)
            if(res.status ==200){
             setTitle(res?.data?.post?.title)
              setDescription(res?.data?.post?.description)
              setPreviewImage(res.data.post.image)
              setCategory(res?.data?.post?.category)

            }
          }catch(err){
            console.log("Errror:",err)
          }
        }

        fetchPost()
  },[])  

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("postImage", image);
    formData.append("title", title);
    formData.append("description", description)
    formData.append("category",category)
    formData.append("author", auth?.userDetails?._id);
    formData.append('previousImage',previewImage)
    try {
      const res = await axios.patch(api.editPost.url+postId, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials:true
      });

      if (res.status === 200) {
        toast("Post Edited Successfully");
        setTimeout(()=>{

          window.location.reload();
        },2000)
      }else{
        toast("falid to Edit  post")
      }
    } catch (err) {
      console.log("error");
    }
  }

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setImage(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  function handleAddCategory(e) {
    const newCategory = e.target.value;

    setCategory((prev) => [...prev, newCategory]);
  }

  return (
    <div className="dark:bg-black">
      <main className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8 dark:bg-black">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
               Edit Post
            </h1>
          </div>
<ToastContainer />
          <form className="p-6 space-y-6">
            <div>
              <label
                htmlFor="postTitle"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                
              >
                Post Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="postTitle"
                placeholder="Enter a compelling title..."
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Featured Image
              </label>
              <div className="flex items-center space-x-4">
                <label className="flex-grow flex flex-col items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 cursor-pointer transition hover:border-blue-400 hover:bg-gray-50 dark:hover:bg-gray-700">
                  <FaCloudUploadAlt className="text-3xl text-gray-400 mb-2" />
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    JPG, PNG up to 5MB
                  </p>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </label>

                <div className="w-32 h-32 rounded-md overflow-hidden border dark:border-gray-600">
                  {console.log("previewImage", previewImage)}
                  <img
                    src={previewImage}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Categories
              </label>
              <div className="flex gap-3">
                <select
                  onChange={(e) => handleAddCategory(e)}
                  className="flex-grow px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition"
                >
                  {console.log(category)}
                  <option value="" disabled>
                    Select a category
                  </option>
                  <option value="Technology">Technology</option>
                  <option value="Programming">Programming</option>
                  <option value="Web Development">Web Development</option>
                  <option value="Artificial Intelligence">
                    Artificial Intelligence
                  </option>
                  <option value="Data Science">Data Science</option>
                </select>
                <button
                  type="button"
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition flex items-center"
                >
                  <FaPlus className="mr-1" /> Add
                </button>
              </div>

              {/* Display added categories */}
              <div className="flex flex-wrap gap-2 mt-3">
                {category.map((categories, index) => {
                  return (
                    <div
                      key={index}
                      className="flex items-center px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm font-medium"
                    >
                      {categories}
                      <button
                        type="button"
                        className="ml-2 text-blue-600 dark:text-blue-300 hover:text-blue-800 dark:hover:text-blue-100"
                        onClick={() => {
                          setCategory((prev) =>
                            prev.filter((_, i) => i !== index)
                          );
                        }}
                      >
                        <FaTimes className="text-xs" />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Content */}
            <div>
              <label
                htmlFor="postContent"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Content <span className="text-red-500">*</span>
              </label>
              <textarea
                id="postContent"
                rows="10"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Write your post content here..."
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition"
              ></textarea>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-4 pt-4">
              <button
                type="button"
                onClick={() => {
                  navigate("/");
                }}
                className="px-6 py-2.5 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition flex items-center"
              >
                <FaTimes className="mr-2" /> Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition flex items-center"
              >
                <FaPaperPlane className="mr-2" /> Publish Post
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default EditPost;