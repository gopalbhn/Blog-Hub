import axios from "axios";
import { createContext,  useContext, useEffect, useState } from "react";
import api from "../api/apiProvider";


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ status: false, userData: undefined });
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    console.log("control")
    const fetchUser = async () => {
      try {
        const response = await axios.get(api.getInfo.url, {
          withCredentials: true,
        });
        
        console.log("asdf", response);
        if (response.data && response.data.success && response.data.user) {
          setAuth({ status: true, userData: response.data.user });
        } else {
          setAuth({ status: false, userData: undefined });
          
        }
      } catch (err) {
        setAuth({status:false,userData:undefined})
        console.log(err)
        setLoading(false)
      }finally{
        setLoading(false)
      }
    };
    fetchUser();
  },[]);

  return(
    <AuthContext.Provider value ={{auth,setAuth}} >
        {children}
    </AuthContext.Provider>
  )
};

export const useAuth = () =>{
    const context = useContext(AuthContext);
    if(!context) throw new Error ("useAuth must be used within an Auth Provider")
        
    return context
}