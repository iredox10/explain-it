import React, { useState } from "react";
import axios from "axios";
import FormInput from "../components/FormInput";
import FormBtn from "../components/FormBtn";
import { path } from "../utils/path";
import { useUserStore } from "../utils/store"; // Ensure you import the correct store
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState(null);
  const navigate = useNavigate();
  // const setUser = useUserStore.setState((state) => state.setUser);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      setErr("Fields can't be empty");
      return;
    }
    try {
      const res = await axios.post(`${path}/login`, { username, password });
      console.log(res);
      if (res.status === 200) {
        useUserStore.setState({ user: res.data });
        if (res.data.user && res.data.user.admin) {
          localStorage.setItem("user", JSON.stringify(res.data.user));
          localStorage.setItem("jwtToken", JSON.stringify(res.data.jwtToken));
          navigate("/admin");
        }
        if (res.data.author.isAuthor) {
          localStorage.setItem("user", JSON.stringify(res.data.author));
          localStorage.setItem("jwtToken", JSON.stringify(res.data.jwtToken));
          // navigate(`/author/${res.data.author._id}`);
          navigate(`/author-dashboard/${res.data.author._id}`);
        }
      }
    } catch (err) {
      setErr(err.response.data);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Welcome Back
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Please sign in to your account
          </p>
        </div>
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          {err && (
            <div className="bg-red-50 border-l-4 border-red-400 p-4">
              <p className="text-red-700">{err}</p>
            </div>
          )}
          <div className="space-y-4">
            <FormInput
              label="Username"
              labelFor="username"
              type="text"
              name="username"
              onchange={(e) => setUsername(e.target.value)}
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary-color focus:border-primary-color focus:z-10 sm:text-sm"
            />
            <FormInput
              label="Password"
              labelFor="password" 
              type="password"
              name="password"
              onchange={(e) => setPassword(e.target.value)}
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary-color focus:border-primary-color focus:z-10 sm:text-sm"
            />
          </div>
          <div>
            <FormBtn 
              text="Sign in"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-color hover:bg-primary-color/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-color"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
