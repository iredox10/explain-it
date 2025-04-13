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
      <div className="md:px-20 py-5 ">
        <div className="grid grid-cols-6 gap-4 ">
          <div className="col-span-3 border-r-2 border-gray-300">
            {category?.posts.map((post) => {
              if (post.priority == 1) {
                return (
                  <div key={post._id} className="pr-2">
                    <Link to={`/post/${post.slug}`}>
                      <div>
                        <img
                          src={post.coverImage}
                          alt={post.title}
                          className="w-full"
                        />
                      </div>
                      <div>
                        <h2 className="font-bold md:text-4xl ">{post.title}</h2>
                        <p>{post.subTitle}</p>
                      </div>
                    </Link>
                  </div>
                );
              }
            })}
          </div>

          <div className="col-span-3 w-full flex flex-col justify-evenly">
            {category?.posts.map((post) => {
              if (post.priority == 2 || post.priority == 3) {
                return (
                  <div key={post._id} className="flex flex-col ">
                    <span>{post.category}</span>
                    <div className="flex items-center">
                      <div className="capitalize">
                        <p className="font-bold text-2xl">{post.title}</p>
                        <div
                          dangerouslySetInnerHTML={{
                            __html: post.article.slice(0, 100),
                          }}
                          className="opacity-70 my-1"
                        ></div>
                      </div>
                      <div className="w-[40%]">
                        <img
                          src={post.coverImage}
                          alt=""
                          className="w-full object-cover"
                        />
                      </div>
                    </div>
                  </div>
                );
              }
            })}
          </div>
        </div>


        <div className="my-10 grid grid-cols-6">
        <hr className="col-span-6 border-t-2 py-2 border-gray-300" />
          <div className="col-span-4">
            {category?.posts.map((post) => {
              if (post.priority > 3) {
                return (
                  <div key={post._Id}>
                    <div className="capitalize">
                      <span>{post.category}</span>
                      <div className="flex gap-2">
                        <div>
                          <p className="font-bold text-2xl">{post.title}</p>
                          <div
                            dangerouslySetInnerHTML={{
                              __html: post.article.slice(0, 300),
                            }}
                          ></div>
                        </div>
                        <div>
                          <img src={post.coverImage} alt="" />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }
            })}
          </div>
        </div>{" "}
      </div>
    </div>
  );
};

export default CategoryPage;
