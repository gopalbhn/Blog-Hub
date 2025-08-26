import  { useEffect, useState } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import CreatePost from "./Pages/CreatePost";

import EditPost from "./Pages/EditPost";
import Profile from "./Pages/Profile";
import { Navbar } from "./components/Navbar";
import { useAuth } from "./context/authProvider";
import ReadBlog from "./Pages/ReadBlog";
import { SearchProvider } from "./context/searchContext";
import AdminDashboard from "./Pages/Admin/AdminDashboard";
import Loader from "./components/Loader";
import ChangePassword from "./Pages/ChangePassword";
import NotFound from "./components/NotFound";
import AllUser from "./Pages/Admin/AllUser";
import AllPost from "./Pages/Admin/AllPost";


const App = () => {
  const [role, setRole] = useState(null);
  const { auth } = useAuth();

  useEffect(() => {
    if (auth.status) {
      setRole(auth.userData.role);
    }
  }, [auth.status, auth.userData]);

  if (auth.userData && role === null) {
    return <Loader />;
  }

  return (
    <>
    <SearchProvider>
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={role == "Admin" ? <AdminDashboard /> : <Home />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/blog/:id" element={<ReadBlog />} />
        <Route path="/change-password/:id" element={<ChangePassword />} />
        {console.log("role auth", role)}
        {role == "Author" && (
          <>
            <Route path="/edit-post/:id" element={<EditPost />} />
            <Route path="/write" element={<CreatePost />} />
          </>
        )}

        <Route
          path="/admin"
          element={role == "Admin" ? <AdminDashboard /> : <Navigate to="/" />}
        />
        {role == "Admin" &&(
          <>
          <Route path="/alluser" element={<AllUser />} />
          <Route path="/allposts" element ={<AllPost />} />
          </>
        )}
        <Route path="*" element={<NotFound />} />
      </Routes>
      </SearchProvider>
    </>
  );
};

export default App;
