
import axios from "axios";
import React, { useEffect, useState } from "react";
import api from "../../api/apiProvider";
import { ToastContainer } from "react-toastify";

const AllUsers = () => {

  const [users,setUsers] = useState([])
    useEffect(()=>{
         async function fetchAllUser(){
        const res = await axios.get(api.getAllUser.url,{
          withCredentials:true
        })

        if(res.status != 200){
          console.log("Unable to get All User")
        }

        setUsers(res.data.user)

      }
      fetchAllUser()

  
    },[])
    
    async function handleDelete(userId){
        const res = await axios.delete(api.deleteUser.url+ userId,{
          withCredentials:true
        })

        if(res.status == 200){
          toast("Post deleted successfully")
        }
      }
  return (
    <div className="container h-[90vh] mx-auto p-6 dark:bg-black dark:text-white">
      <ToastContainer />
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">All Users</h2>
      {console.log(users)}
      <table className="min-w-full  border-1 ">
        <thead>
          <tr>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-white border-1 ">Username</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-white border-1">Email</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-white border-1">Role</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-white border-1">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id} className="border-b">
              <td className="px-4 py-2 text-sm text-gray-700 dark:text-white   border-1">{user.username}</td>
              <td className="px-4 py-2 text-sm text-gray-700 dark:text-white border-1">{user.email}</td>
              <td className="px-4 py-2 text-sm text-gray-700 dark:text-white border-1">{user.role}</td>

              <td className="px-4 py-2">

                {user.role == "Admin" ? (

                  <button
                 
                  onClick={() => handleDelete(user.id)} 
              className={`px-4 py-2 text-sm text-white bg-[#481515]   rounded `}
                  >
                  Delete
                </button>
                ):(
                   <button
                  onClick={() => handleDelete(user._id)} 
                  className={`px-4 py-2 text-sm text-white bg-red-600  hover:bg-red-700 rounded hover:cursor-pointer`}
                  >
                  Delete
                </button>

                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllUsers;