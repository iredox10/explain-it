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
      {post && (
        <div>
          <h1>{post.title}</h1>
          <h3>{post.subTitle}</h3>
          <p>Author: {post.author.fullname}</p>

          <div dangerouslySetInnerHTML={{ __html: article }}></div>
        </div>
      )}
    </div>
  );
};

export default Post;
