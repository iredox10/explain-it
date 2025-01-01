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
    <div className="min-h-screen bg-gray-100">
      <Header searchOnChange={(e) => setSearch(e.target.value)} title={category?.name} subtitle="Manage posts in this category"/>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 mt-16">
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="flex justify-between items-center p-6 border-b">
            <h2 className="text-xl font-semibold text-gray-800">Posts</h2>
            <Link
              to={`/create-post/${category?.slug}`}
              className="inline-flex items-center px-4 py-2 bg-primary-color text-white rounded-md hover:bg-primary-color/90 transition-colors"
            >
              <FaPlus className="mr-2" />
              New Post
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 border-collapse shadow-sm rounded-lg overflow-hidden">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider border-b-2 border-gray-200 first:rounded-tl-lg">Title</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider border-b-2 border-gray-200">Author</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider border-b-2 border-gray-200">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider border-b-2 border-gray-200">Date</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700 uppercase tracking-wider border-b-2 border-gray-200 last:rounded-tr-lg">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {category ? (
                  category.posts.map((post, index) => (
                    <tr key={post._id} className={`hover:bg-gray-50 transition-all duration-200 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'}`}>
                      <td className="px-6 py-5 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900 hover:text-primary-color transition-colors duration-200">
                          <div className="flex items-center space-x-2">
                            <span className="w-2 h-2 rounded-full bg-primary-color/60"></span>
                            <span>{post.title}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5 whitespace-nowrap">
                        <div className="text-sm text-gray-600 flex items-center space-x-2">
                          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                            {post.author ? post.author[0].toUpperCase() : 'A'}
                          </div>
                          <span>{post.author || 'Anonymous'}</span>
                        </div>
                      </td>
                      <td className="px-6 py-5 whitespace-nowrap">
                        <span className="px-3 py-1.5 inline-flex items-center text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-600 mr-1.5"></span>
                          Published
                        </span>
                      </td>
                      <td className="px-6 py-5 whitespace-nowrap">
                        <div className="text-sm text-gray-600 flex items-center space-x-2">
                          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span>{new Date(post.createdAt || Date.now()).toLocaleDateString()}</span>
                        </div>
                      </td>
                      <td className="px-6 py-5 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-4">
                          <Link
                            to={`/post/${post._id}`}
                            className="p-1.5 rounded-full text-blue-600 hover:text-blue-800 hover:bg-blue-50 transition-all duration-200"
                            title="View Post"
                          >
                            <FaEye className="w-5 h-5" />
                          </Link>
                          <Link
                            to={`/edit-post/${post._id}`}
                            className="p-1.5 rounded-full text-green-600 hover:text-green-800 hover:bg-green-50 transition-all duration-200"
                            title="Edit Post"
                          >
                            <FaEdit className="w-5 h-5" />
                          </Link>
                          <button
                            onClick={() => handleShowModel(post._id)}
                            className="p-1.5 rounded-full text-red-600 hover:text-red-800 hover:bg-red-50 transition-all duration-200"
                            title="Delete Post"
                          >
                            <FaTrashAlt className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center justify-center space-y-3">
                        <svg className="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <span className="text-gray-500 text-sm">No posts available in this category</span>
                        <span className="text-gray-400 text-xs">Create a new post to get started</span>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {model && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
            <div className="p-6 border-b">
              <h3 className="text-lg font-semibold text-gray-900">Confirm Deletion</h3>
            </div>
            <div className="p-6">
              <p className="text-gray-700">
                Are you sure you want to delete "{post.title}"? This action cannot be undone.
              </p>
            </div>
            <div className="px-6 py-4 bg-gray-50 flex justify-end space-x-4 rounded-b-lg">
              <button
                onClick={() => setModel(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(category._id)}
                className="px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCategory;
