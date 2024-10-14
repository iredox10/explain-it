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
      <div className="bg-primary-color py-10 px-2 relative">
        <h1 className="absolute -bottom-1 text-4xl text-secondary-color font-bold ">
          Explain-it
        </h1>
      </div>
      <div className="my-10 p-4">
        {post && (
          <div>
            <div className="capitalize my-4">
              <p className="font-medium text-sm">{post.category}</p>
              <h1 className="text-6xl font-black my-1">{post.title}</h1>
              <h3 className="my-2">{post.subTitle}</h3>
              <p>written by: {post.author.map(a => a)}</p>
              <div className="w-full my-4">
                <img src={post.coverImage} className="w-full max-h-[35vh] object-cover" alt={post.title} />
              </div>
            </div>
            <div dangerouslySetInnerHTML={{ __html: article }}></div>
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
