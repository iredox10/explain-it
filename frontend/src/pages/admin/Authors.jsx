import React, { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { path } from "../../utils/path";
import Form from "../../components/Form";
import FormInput from "../../components/FormInput";
import FormBtn from "../../components/FormBtn";
import axios from "axios";
import Header from "../../components/Header";
import { Link } from "react-router-dom";
import { FaEdit, FaEye, FaPlus, FaTrashAlt } from "react-icons/fa";
import DeleteModel from "../../components/DeleteModel";
import EditModel from "../../components/EditModel";

const Authors = () => {
  // const { data: authors, loading, err } = useFetch(`${path}/get-authors`);
  const [authors, setAuthors] = useState();
  const [editModel, setEditModel] = useState(false);

  const fetchAuthors = async () => {
    try {
      const res = await axios(`${path}/get-authors/`);
      setAuthors(res.data);
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchAuthors();
  }, []);

  const [author, setauthor] = useState();
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [about, setAbout] = useState("");
  const [facebook, setFacebook] = useState("");
  const [twitter, setTwitter] = useState("");
  const [password, setPassword] = useState("");
  const [position, setPosition] = useState("");
  const [error, setError] = useState("");

  const [showModel, setShowModel] = useState(false);
  const [showDeleteModel, setShowDeleteModel] = useState(false);

  useEffect(() => {
    if (author) {
      setTimeout(() => {
        setFullname(author.author.fullname);
        setUsername(author.author.username);
        setAbout(author.author.about);
        setTwitter(author.author.twitter);
        setFacebook(author.author.facebook);
        setPosition(author.author.position);
      }, 1000);
    }
  }, [author]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!fullname || !username || !about || !password) {
      setError("all fields can't be empty");
      return;
    }

    const token = JSON.parse(localStorage.getItem("jwtToken"));
    const user = JSON.parse(localStorage.getItem("user"));
    try {
      const res = await axios.post(
        `${path}/add-author`,
        {
          fullname,
          username,
          about,
          facebook,
          twitter,
          password,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res.data);
      if (res.status == 201) {
        setShowModel(false);
        fetchAuthors();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteAuthor = async (authorId) => {};

  const handleEditAuthor = async (e) => {
    e.preventDefault();
    if (!fullname || !username || !about || !password) {
      setError("all fields can't be empty");
      return;
    }
    const token = JSON.parse(localStorage.getItem("jwtToken"));
    const user = JSON.parse(localStorage.getItem("user"));
    try {
      const res = await axios.patch(
        `${path}/edit-author/${author.author._id}`,
        {
          fullname,
          username,
          about,
          position,
          facebook,
          twitter,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res.data);
      if (res.status == 201) {
        setEditModel(false);
        fetchAuthors();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const findAuthorAndShowModel = async (authorId, model) => {
    try {
      const res = await axios(`${path}/get-author/${authorId}`);
      if (res.status == 200) {
        setauthor(res.data);
        model(true);
        console.log(author);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async () => {
    try {
      const res = await axios.delete(
        `${path}/deactivate-author/${author.author._id}`
      );
      if (res.status == 200) {
        setShowDeleteModel(false);
        fetchAuthors();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Header />
      <div className="absolute w-full top-[9rem] grid grid-cols-5 gap-5 text-center p-2 md:p-5">
        {authors
          ? authors.activeAuthors.map((author) => (
              <div>
                <div
                  className="bg-secondary-color drop-shadow-2xl px-4 pt-10 pb-7 capitalize"
                  key={author._id}
                >
                  <p className="font-bold my-8 ">{author.fullname}</p>
                  <div className="text-center flex w-full justify-center gap-5">
                    <Link
                      to={`/admin/author/${author._id}`}
                      className="text-center"
                    >
                      <p className="text-center flex flex-col text-primary-color ">
                        <div className="flex w-full justify-center">
                          <FaEye className="" />
                        </div>
                        <span>view</span>
                      </p>
                    </Link>
                    <button
                      onClick={() =>
                        findAuthorAndShowModel(author._id, setEditModel)
                      }
                    >
                      <p className="text-center flex flex-col text-primary-color">
                        <div className="flex w-full justify-center">
                          <FaEdit className="" />
                        </div>
                        <span>edit</span>
                      </p>
                    </button>

                    <button
                      onClick={() =>
                        findAuthorAndShowModel(author._id, setShowDeleteModel)
                      }
                    >
                      <p className="text-center flex flex-col text-red-600 ">
                        <div className="flex w-full justify-center">
                          <FaTrashAlt className="" />
                        </div>
                        <span>delete</span>
                      </p>
                    </button>
                  </div>
                </div>
              </div>
            ))
          : "no user yet"}
      </div>
      {showModel && (
        <div className="absolute left-[50%] translate-x-[-50%] w-full bg-secondary-color/80 top-0 bottom-0 ">
          <div className="flex place-content-center my-[2rem]">
            <Form
              onsubmit={handleSubmit}
              title={"author"}
              subtitle={"add author"}
              close={() => setShowModel(false)}
            >
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
                onchange={(e) => setUsername(e.target.value.trimEnd())}
              />
              <FormInput
                type={"text"}
                label={"about"}
                labelFor={"about"}
                name={"about"}
                onchange={(e) => setAbout(e.target.value)}
              />
              <div>
                <div className="flex items-center gap-2">
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
                </div>
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
        </div>
      )}{" "}
      <button
        className="absolute right-4 bottom-5 bg-primary-color p-5 rounded-full text-white"
        onClick={() => setShowModel(!showModel)}
      >
        <FaPlus />
      </button>
      {editModel && (
        <EditModel>
          <div className="flex place-content-center my-[2rem]">
            <Form
              onsubmit={handleEditAuthor}
              title={"Edit"}
              subtitle={`${author.author.username}`}
              close={() => setEditModel(false)}
            >
              {error && error}
              <FormInput
                type={"text"}
                label={"fullname"}
                labelFor={"fullname"}
                name={"fullname"}
                onchange={(e) => setFullname(e.target.value)}
                value={fullname}
              />
              <FormInput
                type={"text"}
                label={"username"}
                labelFor={"username"}
                name={"username"}
                onchange={(e) => setUsername(e.target.value)}
                value={username}
              />
              <FormInput
                type={"text"}
                label={"about"}
                labelFor={"about"}
                name={"about"}
                onchange={(e) => setAbout(e.target.value)}
                value={about}
              />
              <div>
                <div className="flex items-center gap-2">
                  <FormInput
                    type={"text"}
                    label={"facebook"}
                    labelFor={"facebook"}
                    name={"facebook"}
                    onchange={(e) => setFacebook(e.target.value)}
                    value={facebook}
                  />
                  <FormInput
                    type={"text"}
                    label={"twitter"}
                    labelFor={"twitter"}
                    name={"twitter"}
                    onchange={(e) => setTwitter(e.target.value)}
                    value={twitter}
                  />
                </div>
                <FormInput
                  type={"text"}
                  label={"position"}
                  labelFor={"position"}
                  name={"position"}
                  onchange={(e) => setPosition(e.target.value)}
                  value={position}
                />
              </div>
              <FormBtn text={"submit"} />
            </Form>
          </div>
        </EditModel>
      )}
      {showDeleteModel && (
        <DeleteModel
          setModel={() => setShowDeleteModel(false)}
          setDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default Authors;
