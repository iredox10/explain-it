import React from "react";
import { Link, useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import Header from "../components/Header";
import CategoryHeader from "../components/CategoryHeader";
import { path } from "../utils/path";

const CategoryPage = () => {
  const { categoryName } = useParams();
  const {
    data: category,
    loading,
    error,
  } = useFetch(`${path}/get-category/${categoryName}`);
  console.log(category);
  return (
    <div>
      <CategoryHeader title={category?.name} about={category?.about} />
      <div className="p-4">
        {category?.posts.length < 5
          ? category.posts.map((post) => (
              <div className="md:grid grid-cols-4">
                <Link to={`/post/${post.slug}`}>
                  <div className="bg-white">
                    <div>
                      <img src={post.coverImage} alt={post.title} />
                    </div>
                    <div className="p-2 text-center capitalize">
                      <h2 className="md:text-3xl text-xl">{post.title}</h2>
                      <p>
                        {post.subTitle.length > 200
                          ? `${post.subTitle.slice(0, 150)}...`
                          : post.subTitle}
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            ))
          : "take ten"}
      </div>
    </div>
  );
};

export default CategoryPage;
