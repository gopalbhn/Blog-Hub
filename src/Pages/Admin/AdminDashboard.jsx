import React, { useEffect, useState } from "react";
import { FaUser, FaUsers, FaEdit, FaTrashAlt } from "react-icons/fa"; // Importing icons from react-icons

import axios from "axios";
import api from "../../api/apiProvider";

const AdminDashboard = () => {
const [user,setUser] = useState([])
const [post,setPost] = useState([]);
  useEffect(()=>{
      async function fetchAllUser(){
        const res = await axios.get(api.getAllUser.url,{
          withCredentials:true
        })

        if(res.status != 200){
          console.log("Unable to get All User")
        }

        setUser(res.data.user)

      }
      fetchAllUser()

      async function fetchPost(){
        const res = await axios.get(api.getAllPost.url,{
          withCredentials:true
        })
        if(res.status != 200){
          console.log("Unable to get All User")
        }
        console.log(res)
        setPost(res.data.allpost)
      }
      fetchPost()

  },[])


  return (
    <div className="min-h-[90vh] py-6 px-15 dark:bg-black text-white">
      <h1 className="text-3xl font-semibold text-center mb-6">Admin Dashboard</h1>
      <div className="flex gap-10">

      <div className="h-[150px] w-[250px] rounded-2xl bg-red-500">
        <div className="text-2xl text-center py-2 border-b-1">
            Total Users
        </div>
        <div className="text-4xl text-center py-2 ">
          {user.length}
        </div>
      </div>
    <div className="h-[150px] mr-10 w-[250px] rounded-2xl bg-red-500">
        <div className="text-2xl text-center py-2 border-b-1">
            Total Posts
        </div>
        <div className="text-4xl text-center py-2 ">
          {post.length}
        </div>
      </div>
    </div>
      </div>
  );
};

export default AdminDashboard;
