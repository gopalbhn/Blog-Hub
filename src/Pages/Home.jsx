import React, { useEffect, useState } from "react";
import Loader from "../components/Loader";

import HomePost from "../components/HomePost";
import axios from "axios";
import api from "../api/apiProvider";
import { useSearch } from "../context/searchContext";
const Home = () => {
  const [post,setPost] = useState([])
  const [loading,setLoading] = useState(true)
  const {searchText} = useSearch()
  
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
          
          setPost(res.data.allpost);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);
  
  {loading && <Loader />}
const SearchedPost = post.filter(item =>
    item.title.toLowerCase().includes(searchText.toLowerCase())
  );
  return (
    <div className="h-[100vh] w-full py-5 px-20 bg-white dark:bg-black dark:text-white flex gap-10">
      <div className="w-full h-[300px] flex gap-10  justify-center ">
{console.log("psots",post)}
      {!loading && SearchedPost.map((post) => {
        return (
          <HomePost
          key={post.title}
          title={post.title}
          image={post.image}
          description={post.description}
          id={post._id}
          />
        );
      })}
      </div>
    </div>
  );
};

export default Home;
