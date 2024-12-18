import React from "react";
import useFetch from "../hooks/useFetch";
import { path } from "../utils/path";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Home = () => {
  const { data, loading, error } = useFetch(`${path}/get-posts`);
  console.log(data);

  return (
    <div className="">
      <div className="bg-primary-color p-10">
        <h1 className='font-saira text-2xl text-white'>Welcome to Home Page</h1>
      </div>
      <div className="flex flex-col md:grid grid-cols-12 p-5 md:p-20  ">

        <div className="col-span-3 order-5">
          {data &&
            data.map((category) => {
              if (category.priority > 4) {
                return (
                  <div>
                    {category.posts.length > 0
                      ? category.posts.map((post) => (
                          <div className="capitalize mb-9 border-2 border-primary-color p-2 ">
                            <Link to={`/post/${post._id}`}>
                              <p className="font-medium">{post.category}</p>
                              <div>
                                <p className="font-play-fair  font-bold text-xl">
                                  {post.title}
                                </p>
                                <div
                                  dangerouslySetInnerHTML={{
                                    __html: post.article.slice(0, 100),
                                  }}
                                  className="my-2"
                                ></div>
                                <p>
                                  <span className="font-bold">By </span>
                                  {post.author[0]}
                                </p>
                              </div>
                            </Link>
                          </div>
                        ))
                      : null}
                  </div>
                );
              }
            })}
        </div>

        <div className="order-1 md:col-start-4 col-end-13">
          <div className="w-full flex flex-col-reverse">
            {data &&
              data.map((category) => {
                if (category.priority <= 4) {
                  return (
                    <div className="">
                      {category.posts.length > 0
                        ? category.posts.map((post) => {
                            if (post.priority == 1) {
                              return (
                                <div id={post._Id} className="md:px-20">
                                  <Link to={`/big-post/${post._id}`}>
                                    <div className="w-full h-[15rem]">
                                      <img
                                        src={post.coverImage}
                                        alt=""
                                        className="w-full object-cover h-full"
                                      />
                                    </div>
                                    <div className="text-center my-4 md:px-12">
                                      <p className="font-play-fair capitalize text-sm my-4">
                                        {" "}
                                        <span className="">by: </span>
                                        {post.author[0]}
                                      </p>
                                      <p className=" font-play-fair text-5xl capitalize my-4">
                                        {post.title}
                                      </p>
                                      <div
                                        className="font-rubik"
                                        dangerouslySetInnerHTML={{
                                          __html: post.article.slice(0, 200),
                                        }}
                                      ></div>
                                    </div>
                                  </Link>
                                </div>
                              );
                            }
                          })
                        : null}
                    </div>
                  );
                }
              })}
          </div>

          <div className="md:mx-20">
            {data &&
              data.map((category) => {
                if (
                  category.priority < 4 &&
                  category.posts.map((post) => post.priority) !== 1
                ) {
                  return (
                    <div className="my-2">
                      <div className="my-4">
                        <div className="flex items-center justify-between gap-5 my-5">
                          <div className="w-full h-1 bg-yellow flex-shrink"></div>
                          <p className="font-bold md:text-2xl flex-grow font-satisfy text-green-500 capitalize">
                            {" "}
                            {category.name}
                          </p>
                        </div>
                        {category.posts.map((post) => (
                          <div className="flex justify-between my-4 gap-36 border-2 border-primary-color p-5">
                            <Link
                              to={`/post/${post._id}`}
                              className="flex  justify-between"
                            >
                              <div>
                                <p>{post.title}</p>
                                <div
                                  dangerouslySetInnerHTML={{
                                    __html: `${post.article.slice(0, 20)} ...`,
                                  }}
                                ></div>
                              </div>
                              <div className="w-[30%]">
                                <img
                                  src={post.coverImage}
                                  alt={post.title + "cover image"}
                                  className="w-full"
                                />
                              </div>
                            </Link>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                }
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
