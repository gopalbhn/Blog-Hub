import axios from 'axios';
import React, { useState } from 'react'
import api from '../api/apiProvider';
import { toast, ToastContainer } from 'react-toastify';
import Loader from '../components/Loader';
import { Link } from 'react-router-dom';

export const Register = () => {
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState("");
  const [username,setUsername] = useState("")
  const [loading,setLoading] = useState(false)
  async function handleClick() {
    setLoading(true)
      try{
        const res = await axios.post(api.register.url,{
          email,
          password,
          username
        })
        if(res.status !== 200){
          console.log(res)
          toast(res.response.data.message)
        }else{
          console.log(res)
          toast("Register Successfully")
        }
      }catch(err){
        toast(err.response.data.message)
      }
      finally{
        setLoading(false)
      }
  }

   return(
    <main className="mx-auto flex min-h-screen w-full items-center justify-center bg-white text-black dark:bg-black dark:text-white">
      <ToastContainer />
      {loading ? (
        <Loader />
      ):(

        <section className="flex w-[28rem] flex-col space-y-8 p-8 rounded-xl bg-[#F9F9F9]  shadow-black dark:shadow-white shadow-xs  dark:bg-black dark:text-white">
        <div className="text-center text-3xl font-semibold text-black">Register</div>

        <div className="w-full transform border-b-[1px] border-gray-300 bg-transparent text-lg duration-300 focus-within:border-black">
          <input
            type="text"
            placeholder="Email"
            className="w-full border-none bg-transparent outline-none placeholder:text-gray-500 text-lg "
            onChange={(e)=>{
              setEmail(e.target.value)
            }}
            />
        </div>

        <div className="w-full transform border-b-[1px] border-gray-300 bg-transparent text-lg duration-300 focus-within:border-black">
          <input
            type="text"
            placeholder="Username"
            className="w-full border-none bg-transparent outline-none placeholder:text-gray-500 text-lg focous:outline-1"
            onChange={(e)=>{
              setUsername(e.target.value)
            }}
            />
        </div>

        <div className="w-full transform border-b-[1px] border-gray-300 bg-transparent text-lg duration-300 focus-within:border-black">
          <input
            type="password"
            placeholder="Password"
            className="w-full border-none bg-transparent outline-none placeholder:text-gray-500 text-lg "
            onChange={(e)=>{
              setPassword(e.target.value)
            }}
            />
        </div>

        <button onClick={handleClick} className="transform rounded-md bg-black py-2 font-medium text-white duration-300 hover:bg-gray-800 hover:text-white border-[1px] border-black dark:bg-white dark:text-black">
          Register
        </button>

       

        <p className="text-center text-sm text-gray-500">
          Already have an account?
          
          <Link to="/login" className="mx-3 font-medium text-black underline-offset-4 hover:underline dark:text-white dark:hover:text-gray-700">
          Login here
          </Link>
        </p>
      </section>
          )} 
    </main>
  )
}


export default Register


