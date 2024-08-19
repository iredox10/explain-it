import React from "react";
import useFetch from "../hooks/useFetch";
import { path } from "../utils/path";
import { Link } from "react-router-dom";

const Home = () => {
  const { data: posts, loading, error } = useFetch(`${path}/get-posts`);
  console.log(posts);
  return (
    <div className="p-5">
      <h1>Welcome to Home Page</h1>
      <div>
        <div>
          <h1>corruption</h1>
        </div>
        <div>
          {posts &&
            posts.map((post) => (
              <div key={post._id}>
                {post.priority == 3 ? (
                  <div className="bg-primary-color">priority 3</div>
                ) : (
                  post.title
                )}
                {post.category == 'fashion' ? <div className="bg-yellow">fashion site</div> : post.article}
                {post.category == 'computer science' ? <div className="bg-red-600">
                  <Link to={`/post/${post._id}`}>{post.title}</Link>
                </div> : post.article}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
