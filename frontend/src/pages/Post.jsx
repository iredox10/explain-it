import React from "react";
import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { path } from "../utils/path";
import DOMPurify from "dompurify";
const Post = () => {
  const { id } = useParams();
  const { data: post, error, loading } = useFetch(`${path}/get-post/${id}`);
  console.log(post);
  const article = post && DOMPurify.sanitize(post.article);
  console.log(article);
  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      <div className="bg-primary-color text-secondary-color pb-10 px-2 min-h-[100vh]">
        <div className="px-10 pt-10">
          <h1 className="text-5xl font-bold font-salsa">Explain-it</h1>
        </div>
        <div className="flex md:flex-row flex-col py-10 md:px-[15rem] relative">
          <div className="order-3 md:order-none">
            {post && (
              <div>
                <p>By <span>{post.author[0]}</span></p>
              </div>
            )}
          </div>
          <div className="mx-5 w-[1px] bg-secondary-color"></div>
          <div>
            {post && (
              <div>
                <p className="text-sm font-medium">{post.category}</p>
                <h1 className="md:text-7xl text-4xl font-bold capitalize md:my-4">{post.title}</h1>
                <p>{post.subTitle}</p>
              </div>
            )}
          </div>
          <div className="absolute top-[100%] left-[50%] -translate-x-[50%] w-full  md:w-[60%]">
             <img src={post && post.coverImage} alt="" className="w-full md:h-[50vh] min-h-[20vh] object-cover "/> 
          </div>
        </div>
      </div>
      <div className="md:mt-64 mt-36 p-4">
        {post && (
          <div>
            <div dangerouslySetInnerHTML={{ __html: article }} className="md:mx-64 text-lg"></div>
          </div>
        )}
      </div>
      <footer className="bg-primary-color p-4">
          <div>
            Logo
          </div>
          <div>
            Links
          </div>
      </footer>
    </div>
  );
};

export default Post;
