import React, { useState } from 'react'
import api from '../api/apiProvider';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';

export const Login = () => {
  const navigate = useNavigate();
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("")
  const [loading,setLoading] = useState(false)
  async function handleClick(){
    try{
      setLoading(true)

   

      const res = await axios.post(api.login.url,{
        email,
        password
      },{withCredentials:true})
      if(!res.status === 200 || res.status == 400){
        setLoading(false)
        toast("Unable to login")
      }else{
        toast(res.data.message)
        
        window.location.href ="/"
      }
   

  }
    catch(err){
     // ✅ must be false on HTTP
      setLoading(false)
      
      toast(err.response?.data?.message)
    }
    finally{
      setLoading(false)
    }

  }
 return (
    <main className="mx-auto flex min-h-screen w-full items-center justify-center bg-white text-black dark:bg-black dark:text-white">
      <section className="flex w-[28rem] flex-col space-y-8 p-8 rounded-xl bg-[#F9F9F9] shadow-xs shadow-black dark:shadow-white dark:bg-black dark:text-white">
        <div className="text-center text-3xl font-semibold text-black dark:text-white">Login</div>
          <ToastContainer />
        {loading && (
          <Loader />
        )}
        {console.log(loading)}
        <div className="w-full transform border-b-[1px] border-gray-300 bg-transparent text-lg duration-300 focus-within:border-black">
          <input
            type="text"
            placeholder="Email"
            className="w-full border-none bg-transparent outline-none placeholder:text-gray-500 text-lg focus:outline-none"
            onChange={(e)=>{
              setEmail(e.target.value)
            }}
          
          />
        </div>

        <div className="w-full transform border-b-[1px] border-gray-300 bg-transparent text-lg duration-300 focus-within:border-black">
          <input
            type="password"
            placeholder="Password"
            className="w-full border-none bg-transparent outline-none placeholder:text-gray-500 text-lg focus:outline-none"
            onChange={(e)=>{
              setPassword(e.target.value)
            }}
          />
        </div>

        <button className="transform rounded-md bg-black  dark:bg-white dark:text-black py-2 font-medium text-white duration-300 hover:bg-gray-800 hover:text-white border-[1px] border-black" onClick={handleClick}>
          Login
        </button>

        <a href="#" className="transform text-center font-medium text-gray-600 dark:text-white duration-300 hover:text-black dark:hover:text-gray-600">
          FORGOT PASSWORD?
        </a>

        <p className="text-center text-sm text-gray-500 dark:text-white">
          No account?
          <Link to="/register" className="mx-2 font-medium text-black dark:text-white underline-offset-4 hover:underline dark:hover:text-gray-600">
            Create One
          </Link>
        </p>
      </section>
    </main>
  )
}

export default Login





