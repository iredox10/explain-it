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
import { FaPlus, FaUser } from "react-icons/fa";

const Author = () => {
  const { id } = useParams();
  // console.log(id);
  // const { data: author, loading, err } = useFetch(`${path}/get-author/${id}`);
  const { data: author, loading, err } = useFetch(`${path}/get-author/${id}`);
  console.log(author);

  return (
    <div className="">
      <Header />
      <div>
        <div className="md:w-full md:absolute top-32 p-5 flex justify-between">
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
              </div>
            )}
          </div>
        </div>
        <div className="my-32">
          <div>
            <h1>Posts</h1>
            {author ? author.posts.map((post) => post.title) : "dkfjk"}
          </div>
          {/* <div>
            <h1>Posts</h1>
            {author && author.posts.length == 0
              ? "no post"
              : author.posts.map((post) => (
                  <div>
                    {post.title}
                    {post.category}
                  </div>
                ))}
          </div> */}
        </div>
        <Link
          className="absolute right-4 bottom-5 bg-primary-color p-5 rounded-full text-white"
          to={`/author-add-post/${author && author.author._id}`}
        >
          <FaPlus />
        </Link>
      </div>
    </div>
  );
};

export default Author;
