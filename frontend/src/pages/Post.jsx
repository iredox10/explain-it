import React, { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { path } from "../utils/path";
import DOMPurify from "dompurify";
import { format } from "date-fns";
import { throttle } from "lodash";

const Post = () => {
  const { id } = useParams();
  const { data: post, error, loading } = useFetch(`${path}/get-post/${id}`);
  console.log(post);
  const fetchArticle = post && DOMPurify.sanitize(post.article);
  const article = useMemo(() => {
    return post ? fetchArticle : null;
  }, [post]);
  // console.log(post.article);
  const [showSmallHeader, setShowSmallHeader] = useState(false);

  const handleScroll = throttle(() => {
    setShowSmallHeader(window.scrollY > 300);
  }, 100);

  useEffect(() => {
    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Cleanup function to remove the event listener
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="">
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {showSmallHeader && (
        <div className="bg-primary-color p-4 text-center text-white sticky top-0 transition-all ease-in-out">
          {post && post.title}
        </div>
      )}

      <div className="bg-primary-color p-16 relative">
        <h1 className="absolute -bottom-5 font-saira text-white md:text-8xl ">
          Explained
        </h1>
      </div>
      {post && (
        <div className="m-10 md:m-20">
          <div className="capitalize">
            <Link to={`/${post.category}`}>{post.category}</Link>
            <h1 className="font-bold text-6xl">{post.title}</h1>
            <p className="font-bold text-lg text-black/50">{post.subTitle}</p>
            <div className="my-2 text-sm">
              <p>
                Writtent By:<span className="font-bold"> {post.author[0]}</span>
              </p>
              <p>
                <span>Date:</span>{" "}
                {format(new Date(post.createdAt), "MMM dd, yyyy")}
              </p>
            </div>
          </div>
          <div className="">
            <div className="md:w-[90%] h-[60vh] my-5">
              <img
                src={post.coverImage}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
            <div className="my-5 md:w-3/4 md:text-lg ">
              {/* {article && (
                <div
                  className="leading-5 text-justify [&>p]:text-gray-700 [&>p]:mb-1 [&>p]:text-black"
                  dangerouslySetInnerHTML={{ __html: article }}
                />
              )} */}
            </div>
          </div>
          <div className="mt-5  ">
            {article && (
              <div>
                <div
                  dangerouslySetInnerHTML={{ __html: article }}
                  className="md:mr-72 text-lg "
                ></div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Post;
