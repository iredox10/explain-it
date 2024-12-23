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
  const [category, setCategory] = useState();
  const [model, setModel] = useState(false);
  const [post, setPost] = useState()
  const [search, setSearch] = useState()
  const { id } = useParams();

  const fetchCategory = async () => {
    try {
      const res = await axios(`${path}/get-category/${id}`);
      setCategory(res.data);
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  // console.log(category.posts.map(post => post.title))
  useEffect(() => {
    fetchCategory();
  }, []);

  const handleShowModel = async (id) => {
    try {
      const res = await axios(`http://localhost:4004/get-post/${id}`);
      if (res.status == 200) {
        setModel(true);
        setPost(res.data)
        console.log(post)
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (postId) => {
    const token = JSON.parse(localStorage.getItem("jwtToken"));
    try {
      const res = await axios.delete(
        `${path}/delete-post/${post._id}/${category._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status == 200) {
        await fetchCategory();
        console.log(res);
        setModel(false)
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Header searchOnChange={(e) => setSearch(e.target.value)}/>
      <div className="absolute w-full top-[9rem] grid grid-cols-5 gap-5 text-center p-2 md:p-5">
        {category
          ? category.posts.map((post) => (
              <div key={post._id}>
                <div
                  className="bg-secondary-color drop-shadow-2xl px-4 pt-10 pb-7 capitalize"
                >
                  <p className="font-bold my-8 ">{post.title}</p>
                  <div className="text-center flex w-full justify-center gap-5">
                    <Link
                      to={`/post/${post._id}`}
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

                    <button onClick={() => handleShowModel(post._id)}>
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
      {model && (
        <div className="absolute left-[50%] translate-x-[-50%] w-full bg-secondary-color/60 top-0 bottom-0 ">
          <div className="flex place-content-center my-[7rem]   ">
            <div className=" border-2 border-primary-color">
              <h1 className="bg-primary-color p-5 capitalize text-white">
                are you sure you want to delete {post.title}
              </h1>
              <div className="flex justify-between p-9">
                <button onClick={() => setModel(false)}>No</button>
                <button onClick={() => handleDelete(category._id)}>Yes</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCategory;
