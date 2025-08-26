import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom' 
import { ThemeProvider } from './context/themeProvider.jsx'
import { AuthProvider } from './context/authProvider.jsx'


createRoot(document.getElementById('root')).render(
  
  <BrowserRouter>
  <ThemeProvider>
  <AuthProvider>
    
  <App/>
  </AuthProvider>
  </ThemeProvider>
  </BrowserRouter>
)
