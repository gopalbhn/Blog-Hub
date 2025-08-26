import { createContext, useState,useEffect } from "react";

 
 const ThemeContext = createContext();
  const ThemeProvider = ({children}) =>{
    const[darkMode,setDarkMode] = useState(true)
    const toggleDarkMode = ()=>{
        console.log("Clicked")
        setDarkMode(!darkMode)
    }

 useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark');
      localStorage.setItem('darkMode', 'true');
    } else {
      document.body.classList.remove('dark');
      localStorage.setItem('darkMode', 'false');
    }
  }, [darkMode]);


  useEffect(() => {
    const storedDarkMode = localStorage.getItem('darkMode');
    if (storedDarkMode) {
      setDarkMode(storedDarkMode === 'true');
    }
  }, []);
    return (
        <ThemeContext.Provider value={{darkMode,toggleDarkMode}} >
            {children}
        </ThemeContext.Provider>
    )
 }

 export {ThemeContext,ThemeProvider}