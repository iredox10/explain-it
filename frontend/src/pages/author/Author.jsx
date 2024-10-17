import React, { useState } from "react";
import useFetch from "../../hooks/useFetch";
import { Link, useParams } from "react-router-dom";
import { path } from "../../utils/path";
import Form from "../../components/Form";
import FormInput from "../../components/FormInput";
import FormTextArea from "../../components/FormTextArea";
import FormBtn from "../../components/FormBtn";
import axios from "axios";
import Header from "../../components/Header";
import { FaPlus } from "react-icons/fa";
const Author = () => {
  const { id } = useParams();
  const { data: author, loading, err } = useFetch(`${path}/get-author/${id}`);
  console.log(author);

  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [category, setCategory] = useState();
  const [article, setArticle] = useState("");
  const [priority, setPriority] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = JSON.parse(localStorage.getItem("jwtToken"));
    const user = JSON.parse(localStorage.getItem("user"));
    try {
      const res = await axios.post(
        `${path}/post-article/${user._id}/${id}`,
        {
          title,
          subTitle,
          article,
          priority,
          category,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="">
      <Header />
      <div className="md:w-full md:absolute top-32 p-5 flex justify-between">
        <div className="bg-gray-200 h-[10rem] w-[10rem]"></div>
        <div>
          {author && (
            <div>
              <div>
                <p>
                  <span>fullname:</span> {author.author.fullname}
                </p>
                <p>
                  <span>username:</span> {author.author.username}
                </p>
              </div>
              <div>
                <h1>Posts</h1>
                {author && author.posts.length == 0
                  ? "no post"
                  : author.posts.map((post) => (
                      <div>
                        {post.title}
                        {post.category}
                      </div>
                    ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <Link
        className="absolute right-4 bottom-5 bg-primary-color p-5 rounded-full text-white"
        to={`/author-add-post/${author && author.author._id}`}
      >
        <FaPlus />
      </Link>
    </div>
  );
};

export default Author;
