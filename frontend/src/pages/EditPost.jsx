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

const EditPost = () => {
  const { id } = useParams();
  const [coverImage, setCoverImage] = useState(null);
  const [previewImage, setPreviewImage] = useState("");
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [article, setArticle] = useState("");
  const [priority, setPriority] = useState("");
  const [draftId, setDraftId] = useState("");
  const [error, setError] = useState("");
  const [category, setCategory] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleCoverImageChange = (e) => {
    setCoverImage(e.target.files[0]);

    const reader = new FileReader();
    reader.onload = (e) => {
      setPreviewImage(e.target.result);
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const fetchPost = async () => {
    setIsLoading(true);
    try {
      const res = await axios(`${path}/get-post/${id}`);
      setTimeout(() => {
        setTitle(res.data.title);
        setArticle(res.data.article);
        setPriority(res.data.priority);
        setSubTitle(res.data.subTitle);
        setDraftId(res.data._id);
        setCategory(res.data.category);
        setCoverImage(res.data.coverImage);
      }, 100);
      if (article) {
        setIsLoading(false);
      }
    } catch (err) {
      setError(err.response.data);
      console.log(err);
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
      const res = await axios.patch(
        `${path}/edit-post/${id}`,
        {
          title,
          subTitle,
          article,
          priority,
          // category: category.name,
          coverImage: previewImage,
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

  // TODO: Implement drafting of post after editing a post
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
        {coverImage && <img src={coverImage} alt="" />}
        {previewImage && <img src={previewImage} />}
        <form onSubmit={handleSubmit}>
          {error && error}
          <input
            type="file"
            name="coverImage"
            id="coverImage"
            onChange={(e) => handleCoverImageChange(e)}
          />

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
          <button type="submit">edit</button>
        </form>
      </div>
    </div>
  );
};

export default EditPost;
