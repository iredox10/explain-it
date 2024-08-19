import React, { useState } from "react";
import useFetch from "../../hooks/useFetch";
import { path } from "../../utils/path";
import Form from "../../components/Form";
import FormInput from "../../components/FormInput";
import FormBtn from "../../components/FormBtn";
import axios from "axios";

const Authors = () => {
  const { data: authors, loading, err } = useFetch(`${path}/get-authors`);

  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [about, setAbout] = useState("");
  const [facebook, setFacebook] = useState("");
  const [twitter, setTwitter] = useState("");
  const [password, setPassword] = useState('')
  const [position, setPosition] = useState('')
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!fullname || !username || !about || !password) {
      setError("all fields can't be empty");
      return;
    }

    const token = JSON.parse(localStorage.getItem("jwtToken"));
    const user = JSON.parse(localStorage.getItem("user"));
    try {
      const res = await axios.post(`${path}/add-author`, {
        fullname,
        username,
        about,
        facebook,
        twitter,
        password,
      },{
        headers: {
          Authorization : `Bearer ${token}`
        }
      });
      console.log(res.data)
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div>
        {authors &&
          authors.map((author) => (
            <div key={author._id}>
              <p>
                <span>fullname:</span>
                {author.fullname}
              </p>
              <p>
                <span>username:</span>
                {author.username}
              </p>
            </div>
          ))}
      </div>

      <Form onsubmit={handleSubmit} title={"author"} subtitle={"add author"}>
        {error && error}
        <FormInput
          type={"text"}
          label={"fullname"}
          labelFor={"fullname"}
          name={"fullname"}
          onchange={(e) => setFullname(e.target.value)}
        />
        <FormInput
          type={"text"}
          label={"username"}
          labelFor={"username"}
          name={"username"}
          onchange={(e) => setUsername(e.target.value)}
        />
        <FormInput
          type={"text"}
          label={"about"}
          labelFor={"about"}
          name={"about"}
          onchange={(e) => setAbout(e.target.value)}
        />
        <div>
          <FormInput
            type={"text"}
            label={"facebook"}
            labelFor={"facebook"}
            name={"facebook"}
            onchange={(e) => setFacebook(e.target.value)}
          />
          <FormInput
            type={"text"}
            label={"twitter"}
            labelFor={"twitter"}
            name={"twitter"}
            onchange={(e) => setTwitter(e.target.value)}
          />
          <FormInput
            type={"text"}
            label={"position"}
            labelFor={"position"}
            name={"position"}
            onchange={(e) => setPosition(e.target.value)}
          />
          <FormInput
            type={"password"}
            label={"password"}
            labelFor={"password"}
            name={"password"}
            onchange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div></div>
        <FormBtn text={"submit"} />
      </Form>
    </div>
  );
};

export default Authors;
