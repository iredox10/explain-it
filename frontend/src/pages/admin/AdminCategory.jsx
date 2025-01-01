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
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="text-lg font-medium text-gray-800">Posts</h2>
            <Link
              to={`/create-post/${category?.slug}`}
              className="inline-flex items-center px-3 py-1.5 bg-primary-color text-white text-sm rounded hover:bg-primary-color/90 transition-colors shadow-sm"
            >
              <FaPlus className="mr-1 h-3.5 w-3.5" />
              New
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-md">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Author</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {category ? (
                  category.posts.map((post) => (
                    <tr key={post._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{post.title}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{post.author || 'Anonymous'}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          Published
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {new Date(post.createdAt).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <div className="flex justify-end gap-4">
                          <Link
                            to={`/post/${post._id}`}
                            className="text-blue-600 hover:text-blue-800 transition-colors"
                            title="View Post"
                          >
                            <FaEye className="h-5 w-5" />
                          </Link>
                          <Link
                            to={`/edit-post/${post._id}`}
                            className="text-green-600 hover:text-green-800 transition-colors"
                            title="Edit Post"
                          >
                            <FaEdit className="h-5 w-5" />
                          </Link>
                          <button
                            onClick={() => handleShowModel(post._id)}
                            className="text-red-600 hover:text-red-800 transition-colors"
                            title="Delete Post"
                          >
                            <FaTrashAlt className="h-5 w-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                      No posts available in this category
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
