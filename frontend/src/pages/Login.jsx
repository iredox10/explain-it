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
    setErr(null);
    if (!username || !password) {
      setErr("All fields are required");
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
          navigate(`/admin/${res.data.user._id}`);
        }
        if (res.data.author.isAuthor) {
          localStorage.setItem("user", JSON.stringify(res.data.author));
          localStorage.setItem("jwtToken", JSON.stringify(res.data.jwtToken));
          // navigate(`/author/${res.data.author._id}`);
          navigate(`/author-dashboard/${res.data.author._id}`);
        }
      }
    } catch (error) {
      if (error.response) {
        setErr(error.response.data || "Login failed. Please try again.");
      } else if (error.request) {
        setErr("Network error. Please check your connection.");
      } else {
        setErr("Something went wrong. Please try again later.");
      }
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
            <div className="rounded-md bg-red-50 p-4 border border-red-200 animate-fadeIn">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-red-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-red-800">{err}</p>
                </div>
              </div>
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
