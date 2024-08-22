import { useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import axios from "axios";
import { useState } from "react";
import { quillFormats, quillModules } from "../utils/constants";
import Header from "../components/Header";
import "./quill.css";
import useFetch from "../hooks/useFetch";
import { path } from "../utils/path";
import { useUserStore } from "../utils/store";
import NsHeader from "../components/NsHeader";

const CreatePost = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [article, setArticle] = useState("");
  const [priority, setPriority] = useState("");
  const [error, setError] = useState("");

  const modules = quillModules;
  const formats = quillFormats;

  const token = JSON.parse(localStorage.getItem("jwtToken"));
  const user = JSON.parse(localStorage.getItem("user"));

  const {
    data: category,
    err,
    loading,
  } = useFetch(`${path}/get-category/${id}`);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !subTitle || !article) {
      setError("all fields can't be empty");
    }
    try {
      const res = await axios.post(
        `${path}/post-article/${user._id}/${id}`,
        {
          title,
          subTitle,
          article,
          priority,
          category: category.name,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDraft = async () => {
    if (!title || !subTitle || !article) {
      setError("all fields can't be empty");
      console.log(user._id);
      return;
    }
    try {
      const res = await axios.post(
        `${path}/add-draft/${user._id}`,
        {
          title,
          subTitle,
          article,
          category: category.name,
          priority,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <NsHeader headerText={`Create New Post`} />
      <div className="absolute w-4/6 drop-shadow-2xl top-[9rem] left-[4rem] py-4 bg-secondary-color">
        <form onSubmit={handleSubmit}>
          {error && error}
          <div className="flex justify-end">
            <input
              type="file"
              name="coverImage"
              id="coverImage"
              className="border-2 border-green-500 "
              placeholder="add cover image"
            />
          </div>
          <div className="flex flex-col">
            <textarea
              type="text"
              name="title"
              placeholder="Post Title"
              className="p-10 text-4xl capitalize font-bold text-wrap bg-secondary-color outline-none"
              onChange={(e) => setTitle(e.target.value)}
            ></textarea>
            <div className="flex w-full">
              <textarea
                type="text"
                name="subtitle"
                id="subtitle"
                placeholder="subtitle"
                className="w-full px-10 font-bold text-2xl max-h-16 bg-secondary-color"
                onChange={(e) => setSubTitle(e.target.value)}
              ></textarea>
              <input
                type="number"
                name="priority"
                id="priority"
                placeholder="priority"
                className="w-full px-10 font-bold text-2xl bg-secondary-color"
                onChange={(e) => setPriority(e.target.value)}
              />
            </div>
          </div>
          <div>
            <ReactQuill
              value={article}
              onChange={setArticle}
              modules={modules}
              formats={formats}
              placeholder="Post here..."
            />
          </div>
          <div className="flex justify-end gap-4 p-4 ">
            <button type="submit" className="capitalize bg-primary-color font-bold text-white px-9 py-2">publish</button>
            <button type="button" className="capitalize text-primary-color font-bold" onClick={handleDraft} >
              draft
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
