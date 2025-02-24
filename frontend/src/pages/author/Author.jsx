import React, { useState } from "react";
import useFetch from "../../hooks/useFetch";
import { Link, useParams } from "react-router-dom";
import { path } from "../../utils/path";
import Header from "../../components/Header";
import { FaPlus, FaUser } from "react-icons/fa";
import AuthorPostTable from "../../components/AuthorPostTable";
import AuthorHeader from "../../components/AuthorHeader";

const Author = () => {
  const { id } = useParams();
  // const { data: author, loading, err } = useFetch(`${path}/get-author/${id}`);
 const { data: author, loading, err } = useFetch(`${path}/get-author/${id}`);
  console.log(author);

  return (
    <div className="">
      <AuthorHeader />

      <div className="">
        <div className="absolute top-[8rem] w-full">

          <div className="flex justify-between items-center mx-16">
            <div >
            <h1 className="text-5xl font-bold text-white">Posts</h1>
            <p className="text-white mt-2">List Of My Posts</p>
        </div>

            <div className="">
              <div className="relative">
                <input
                  type="search"
                  name="search"
                  id="search"
                  className="w-72 md:w-72 px-6 py-2 rounded-full shadow-xl border-2 border-gray-100 focus:outline-none focus:border-white focus:ring-2 focus:ring-white/50 transition-all"
                  placeholder="Search..."
                  // onChange={searchOnChange}
                />
                <svg
                  className="w-5 h-5 absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
          </div>
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
