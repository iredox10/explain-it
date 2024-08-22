import React, { useState } from "react";
import useFetch from "../../hooks/useFetch";
import { useParams } from "react-router-dom";
import { path } from "../../utils/path";
import Form from "../../components/Form";
import FormInput from "../../components/FormInput";
import FormTextArea from "../../components/FormTextArea";
import FormBtn from "../../components/FormBtn";
import axios from "axios";
const Author = () => {
  const { id } = useParams();
  const { data, loading, err } = useFetch(`${path}/get-author/${id}`);
  console.log(data)
  const {
    data: categories,
    loading: load,
    err: error,
  } = useFetch(`${path}/get-categories`);
  console.log(categories);

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
    <div>
      {data && (
        <div>
          <div>
            <p>
              <span>fullname:</span> {data.author.fullname}
            </p>
            <p>
              <span>username:</span> {data.author.username}
            </p>
          </div>
          <div>
            <h1>Posts</h1>
            {data && data.posts.length == 0
              ? "no post"
              : data.posts.map((post) => (
                  <div>{post.title}
                  {post.category} 
                  </div>
                ))}
          </div>
        </div>
      )}
      <Form onsubmit={handleSubmit} title={"Post"} subtitle={" new article"}>
        <FormInput
          type={"text"}
          label={"title"}
          labelFor={"title"}
          name={"title"}
          onchange={(e) => setTitle(e.target.value)}
        />
        <FormInput
          type={"text"}
          label={"subTitle"}
          labelFor={"subTitle"}
          name={"subTitle"}
          onchange={(e) => setSubTitle(e.target.value)}
        />
        <div>
          {category}
          <label htmlFor="category">Category</label>
          <select
            name="category"
            id="category"
            className="w-full border-2 border-primary-color p-2 capitalize "
            onChange={e => setCategory(e.target.value)}
          >
            {categories &&
              categories.map((category) => (
                  // <option selected>Select Category</option>
                  <option value={category.name}>{category.name}</option>
              ))}
          </select>
        </div>
        <FormInput
          type={"number"}
          label={"priority"}
          labelFor={"priority"}
          name={"priority"}
          onchange={(e) => setPriority(e.target.value)}
        />
        <FormTextArea
          label={"article"}
          labelFor={"article"}
          onchange={(e) => setArticle(e.target.value)}
        />
        <FormBtn text={"post"} />
      </Form>
    </div>
  );
};

export default Author;
