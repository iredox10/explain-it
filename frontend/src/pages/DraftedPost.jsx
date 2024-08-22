import { useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import axios from "axios";
import { useEffect, useState } from "react";
import { quillFormats, quillModules } from "../utils/constants";
import Header from "../components/Header";
import "./quill.css";
import useFetch from "../hooks/useFetch";
import { path } from "../utils/path";
import { useUserStore } from "../utils/store";

const DraftedPost = () => {
  const { id } = useParams();
  console.log(id);
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [article, setArticle] = useState("");
  const [priority, setPriority] = useState("");
  const [draftId, setDraftId] = useState('')
  const [error, setError] = useState("");
  const [category, setCategory] = useState('')

  const fetchPost = async () => {
    try {
      const res = await axios(`${path}/get-draft/${id}`);
      setTimeout(() => {
        setTitle(res.data.title);
        setArticle(res.data.article);
        setPriority(res.data.priority);
        setSubTitle(res.data.subTitle);
        setDraftId(res.data._id)
        setCategory(res.data.category)
      }, 100);
    } catch (err) {
      console.log(err.response.data);
    }
  };

  useEffect(() => {
    const fetch = async () => {
      await fetchPost();
    };
    fetch();
  }, []);

  const modules = quillModules;
  const formats = quillFormats;

  const token = JSON.parse(localStorage.getItem("jwtToken"));
  const user = JSON.parse(localStorage.getItem("user"));
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !subTitle || !article) {
      setError("all fields can't be empty");
    }
    try {
      const res = await axios.post(`${path}/publish-draft/${id}`, {
        title,
        subTitle,
        article,
        priority,
        // category: category.name,
      },{
        headers:{
            Authorization: `Bearer ${token}`
        }
      });
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
      const res = await axios.patch(
        `${path}/update-draft/${draftId}`,
        {
          title,
          subTitle,
          article,
          category,
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
      <Header />
      <div className="absolute top-[5rem] bg-secondary-color">
        <form onSubmit={handleSubmit}>
          {error && error}
          <input type="file" name="coverImage" id="coverImage" />
          <div className="flex flex-col">
            <textarea
              type="text"
              name="title"
              placeholder="Post Title"
              className="p-10 text-4xl capitalize font-bold text-wrap"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            ></textarea>
            <div className="flex w-full">
              <textarea
                type="text"
                name="subtitle"
                id="subtitle"
                placeholder="subtitle"
                className="w-full px-10 font-bold text-2xl max-h-16"
                onChange={(e) => setSubTitle(e.target.value)}
                value={subTitle}
              ></textarea>
              <input
                type="number"
                name="priority"
                id="priority"
                placeholder="priority"
                className="w-full px-10 font-bold text-2xl"
                onChange={(e) => setPriority(e.target.value)}
                value={priority}
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
              defaultValue={article}
            />
          </div>
          <button type="submit">publish</button>
          <button type="button" onClick={handleDraft}>
            draft
          </button>
        </form>
      </div>
    </div>
  );
};

export default DraftedPost;
