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
          navigate(`/author/${res.data.author._id}`);
        }
      }
    } catch (err) {
      setErr(err.response.data);
    }
  };

  return (
    <div className="flex justify-center items-center py-32">
      <div className="border border-primary-color">
        <h1 className="bg-primary-color text-white text-2xl px-2 py-3">
          Login <span className="text-sm">Login to your account</span>
        </h1>
        <form onSubmit={handleSubmit} className="my-6 px-2">
          {err && <p>{err}</p>}
          <FormInput
            label={"username"}
            labelFor={"username"}
            type={"text"}
            name={"username"}
            onchange={(e) => setUsername(e.target.value)}
          />
          <FormInput
            label={"password"}
            labelFor={"password"}
            type={"password"}
            name={"username"}
            onchange={(e) => setPassword(e.target.value)}
          />
          <FormBtn text={"Login"} />
        </form>
      </div>
    </div>
  );
};

export default Login;
