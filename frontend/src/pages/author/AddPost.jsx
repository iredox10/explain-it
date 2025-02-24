import { useNavigate, useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import axios from "axios";
import { useState } from "react";
import Header from "../../components/Header";
import ".././quill.css";
import useFetch from "../../hooks/useFetch";
import { path } from "../../utils/path";
import { useUserStore } from "../../utils/store";
import NsHeader from "../../components/NsHeader";
import { quillFormats, quillModules } from "../../utils/constants";
import { FaTimes } from "react-icons/fa";

const CreatePost = () => {
  const { id } = useParams();
  const [coverImage, setCoverImage] = useState(null);
  const [previewImage, setpreviewImage] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState();
  const [subTitle, setSubTitle] = useState("");
  const [article, setArticle] = useState("");
  const [priority, setPriority] = useState("");
  const [error, setError] = useState("");
  const [quillHtml, setQuillHtml] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const modules = quillModules;
  const formats = quillFormats;

  const token = JSON.parse(localStorage.getItem("jwtToken"));
  const user = JSON.parse(localStorage.getItem("user"));

  const {
    data: categories,
    loading: load,
    err: catErr,
  } = useFetch(`${path}/get-categories`);

  const handleChange = (html) => {
    setQuillHtml(html);
  };

  const handleCoverImageChange = (e) => {
    const file = e.target.files[0];
    const fileFormats = ["image/png", "image/jpeg", "image/webp"];
    if (!fileFormats.includes(file.type)) {
      setError("image format not supported");
      setpreviewImage("");
      return;
    } else {
      setError("");
      setIsLoading(false);
      setCoverImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setpreviewImage(e.target.result);
        setCoverImage(file);
      };
      reader.readAsDataURL(file);
    }
  };

  // const handleCoverImageChange = (e) => {
  //   setCoverImage(e.target.files[0]);

  //   const reader = new FileReader();
  //   reader.onload = (e) => {
  //     setpreviewImage(e.target.result);
  //     setError('')
  //   };
  //   reader.readAsDataURL(e.target.files[0]);
  // };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const imagesUrls = [];
    setError("");
    setIsLoading(true);
    if (priority > 10) {
      setError("priority can't be morethan 10");
      setIsLoading(false);
      return;
    }

    if (priority < 1) {
      setError("priority can't be less than 1");
      setIsLoading(false);
      return;
    }

    if (!title || !subTitle || !article) {
      setError("all fields can't be empty");
      setIsLoading(false);
      console.log(isLoading);
      return;
    }
    if (!coverImage) {
      setError("No cover Imaage");
      setIsLoading(false);
      return;
    }

    const quill = document.querySelector(".ql-editor");
    const images = quill.querySelectorAll("img");

    images.forEach((image) => {
      imagesUrls.push(image.src);
    });

    try {
      setError("");
      setIsLoading(true);
      const res = await axios.post(
        `${path}/author-post-article/${id}`,
        {
          title,
          subTitle,
          article,
          priority,
          category,
          images: imagesUrls,
          coverImage: previewImage,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res);
      if (res.status == 201) {
        setIsLoading(false);
        navigate(-1);
      } else {
        setIsLoading(false);
      }
    } catch (err) {
      console.log(err);
      setIsLoading(false);
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
      navigate(-1);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="">
      <NsHeader headerText={`Create New Post`} />

      <div className="absolute w-4/6 drop-shadow-2xl top-[9rem] left-[4rem] py-4 bg-secondary-color">
        <div className="sticky top-4 mx-4 z-10 w-2/4">
          {error && (
            <div className="flex items-center bg-red-600 text-white">
              <div className="h-full w-2 mr-4 bg-white text-white">.</div>
              <p className="w-full capitalize font-bold">{error && error}</p>
              <div className=" ">
                <FaTimes />
              </div>
            </div>
          )}
        </div>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col space-y-2 p-4">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => document.getElementById("coverImage").click()}
                className="px-4 py-2 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors text-sm font-medium flex items-center gap-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                Add a cover image
              </button>
              <input
                type="file"
                name="coverImage"
                id="coverImage"
                className="hidden"
                onChange={(e) => handleCoverImageChange(e)}
                accept="image/png,image/jpeg,image/webp"
              />
            </div>
            {coverImage && (
              <div className="relative">
                <img
                  src={previewImage}
                  alt="Cover preview"
                  className="max-h-[150px] w-full object-cover rounded-md"
                />
                <button
                  onClick={() => {
                    setCoverImage(null);
                    setpreviewImage("");
                  }}
                  className="absolute top-2 right-2 p-1 bg-gray-900/50 hover:bg-gray-900/75 rounded-full text-white transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            )}
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

              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                name=""
                id=""
                className="bg-primary-color text-white p-2"
              >
                <option value="" disabled selected className="font-bold">Select Category</option>
                {isLoading ? (
                  <option value="">Loading...</option>
                ) : (
                  categories &&
                  categories.map((cat) => (
                    <option key={cat._id} value={cat.name}>
                      {cat.name}
                    </option>
                  ))
                )}
              </select>
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
            <button
              type="submit"
              className={
                isLoading
                  ? " capitalize bg-primary-color/30 font-bold text-white px-9 py-2"
                  : "capitalize bg-primary-color font-bold text-white px-9 py-2"
              }
              disabled={isLoading}
            >
              {isLoading ? "Publishing..." : "Publish"}
            </button>
            <button
              type="button"
              className={"capitalize text-primary-color font-bold"}
              onClick={handleDraft}
            >
              draft
            </button>
          </div>
        </form>
      </div>

      {/* <div className="absolute w-4/6 drop-shadow-2xl top-[9rem] left-[4rem] py-4 bg-secondary-color">
        <form onSubmit={handleSubmit}>
          {error && error}
          <div className="flex justify-end">
            <input
              type="file"
              name="coverImage"
              id="coverImage"
              className="border-2 border-green-500 "
              placeholder="add cover image"
              onChange={(e) => handleCoverImageChange(e)}
            />
            {coverImage && (
              <img src={previewImage} style={{ width: "200px" }} />
            )}
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
              <select value={category} onChange={e => setCategory(e.target.value)} name="" id="">
                <option value="">Select Category</option>
                {isLoading? (
                  <option value="">Loading...</option>
                ) : (
                  categories &&
                  categories.map((cat) => (
                    <option key={cat._id} value={cat.name}>
                      {cat.name}
                    </option>
                  ))
                )}
              </select>
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
            <button
              type="submit"
              className={
                isLoading
                  ? " capitalize bg-primary-color font-bold text-white px-9 py-2"
                  : "capitalize bg-primary-color font-bold text-white px-9 py-2"
              }
              disabled={isLoading}
            >
              {isLoading ? "Publishing" : "Publish"}
            </button>
            <button
              type="button"
              className={"capitalize text-primary-color font-bold"}
              onClick={handleDraft}
            >
              draft
            </button>
          </div>
        </form>
      </div> */}
    </div>
  );
};

export default CreatePost;
