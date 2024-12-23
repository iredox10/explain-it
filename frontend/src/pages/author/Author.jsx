import React, { useState } from "react";
import useFetch from "../../hooks/useFetch";
import { Link, useParams } from "react-router-dom";
import { path } from "../../utils/path";
import Header from "../../components/Header";
import { FaPlus, FaUser } from "react-icons/fa";
import AuthorPostTable from "../../components/AuthorPostTable";

const Author = () => {
  const { id } = useParams();
  // console.log(id);
  // const { data: author, loading, err } = useFetch(`${path}/get-author/${id}`);
  const { data: author, loading, err } = useFetch(`${path}/get-author/${id}`);
  console.log(author);

  return (
    <div className="">
      <Header />
      <div className="p-10">
        {/* <div className="md:w-full md:absolute top-32 p-5 flex justify-between">
        </div> */}
       <div>
        {author && <div className="capitalize">
          <p>fullname <span>{author.author.fullname}</span></p> 
          <p>username <span>{author.author.username}</span></p> 
          </div>}
        </div> 
        <div className="my-5">
          <h1>Posts</h1>
          <AuthorPostTable data={author} />
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
