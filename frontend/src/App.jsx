import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, json } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Register from "./pages/Register";
import Admin from "./pages/admin/Admin";
import Login from "./pages/Login";
import { useUserStore } from "./utils/store";
import AdminCategory from "./pages/admin/AdminCategory";
import Author from "./pages/author/Author";
import AdminCategories from "./pages/admin/AdminCategories";
import AdminDrafts from "./pages/admin/AdminDrafts";
import Authors from "./pages/admin/Authors";
import CreatePost from "./pages/CreatePost";
import Post from "./pages/Post";
import DraftedPost from "./pages/DraftedPost";
import EditPost from "./pages/EditPost";

function App() {
  const user = useUserStore((state) => state.user);
  console.log(user);
  useEffect(() => {
    if (user) {
      JSON.parse(localStorage.getItem("user"));
    }
    // useUserStore.setState({ user: user });
  }, []);
  return (
    <div className="bg-secondary-color min-h-[100vw]">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/about" element={<About />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/category/:id" element={<AdminCategory />} />
          <Route path="/admin/categories" element={<AdminCategories />} />
          <Route path="/admin/authors" element={<Authors />} />
          <Route path="/admin/drafts" element={<AdminDrafts />} />

          <Route path="/author/:id" element={<Author />} />

          <Route path="/post/:id" element={<Post />} />
          <Route path="/create-post/:id" element={<CreatePost />} />
          <Route path="/edit-post/:id" element={<EditPost />} />
          <Route path="/drafted-post/:id" element={<DraftedPost />} />

          <Route path="*" element={<p>page not found</p>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
