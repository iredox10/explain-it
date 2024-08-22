import React, { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { path } from "../../utils/path";
import axios from "axios";
import { useUserStore } from "../../utils/store";
import "react-quill/dist/quill.snow.css";
import Header from "../../components/Header";
import { FaEdit, FaEye, FaPlus, FaTrashAlt } from "react-icons/fa";
const AdminCategory = () => {
  const { id } = useParams();
  const {
    data: category,
    loading,
    err,
  } = useFetch(`${path}/get-category/${id}`);
  console.log(category);

  // const wrapperRef = useCallback((wrapper) => {
  //   if (wrapper == null) return;
  //   wrapper.innerHtml = "";
  //   const editor = document.createElement("div");
  //   wrapper.append(editor);
  //   new Quill(editor, { theme: "snow" });
  // }, []);

  return (
    <div>
      <Header />
      
      <div className="absolute w-full top-[9rem] grid grid-cols-5 gap-5 text-center p-2 md:p-5">
        {category
          ? category.posts.map((post) => (
              <div>
                <div
                  className="bg-secondary-color drop-shadow-2xl px-4 pt-10 pb-7 capitalize"
                  key={post._id}
                >
                  <p className="font-bold my-8 ">{post.title}</p>
                  <div className="text-center flex w-full justify-center gap-5">
                    <Link
                      to={`/admin/post/${post._id}`}
                      className="text-center"
                    >
                      <p className="text-center flex flex-col text-primary-color ">
                        <div className="flex w-full justify-center">
                          <FaEye className="" />
                        </div>
                        <span>view</span>
                      </p>
                    </Link>
                    <Link to={`/edit-post/${post._id}`}>
                      <p className="text-center flex flex-col text-primary-color">
                        <div className="flex w-full justify-center">
                          <FaEdit className="" />
                        </div>
                        <span>edit</span>
                      </p>
                    </Link>

                    <button>
                      <p className="text-center flex flex-col text-red-600 ">
                        <div className="flex w-full justify-center">
                          <FaTrashAlt className="" />
                        </div>
                        <span>delete</span>
                      </p>
                    </button>
                  </div>
                </div>
              </div>
            ))
          : "no post yet"}
      </div>
      <Link
        className="absolute right-4 bottom-5 bg-primary-color p-5 rounded-full text-white"
        to={`/create-post/${category && category._id}`}
      >
        <FaPlus />
      </Link>
    </div>
  );
};

export default AdminCategory;
