import React from "react";
import useFetch from "../hooks/useFetch";
import { path } from "../utils/path";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Home = () => {
  const { data, loading, error } = useFetch(`${path}/get-posts`);
  console.log(data);

  return (
    <div className="p-5">
      <h1>Welcome to Home Page</h1>
      <div>
        <div>
          <h1>corruption</h1>
        </div>
        <div className={`grid grid-cols-12 gap-5`}>
          {data &&
            data.map((category) => (
              // <div key={post._id} className={`col-span-${post.priority} border-2`}>
              <div
                key={category._id}
                className={`col-span-4  ${
                  category.priority >= 12
                    ? "col-span-full row-span-full "
                    : "col-span-4"
                }`}
              >
                <h1 className="capitalize font-bold text-yellow">
                  {category.name}
                </h1>
                {category.posts.length >= 0
                  ? category.posts.map((post) => (
                      <div
                        className={`${
                          post.priority > 4 ? "w-full bg-blue-500" : ""
                        }`}
                      >
                        <Link to={`/post/${post._id}`}> {post.title}</Link>
                      </div>
                    ))
                  : null}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
