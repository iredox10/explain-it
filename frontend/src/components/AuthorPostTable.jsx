import React from "react";
import { FaEdit, FaEye, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const AuthorPostTable = ({ data }) => {
  console.log(data && data.posts);
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-md">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Subtitle
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Priority
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {data && data.posts.posts.length > 0 ? (
              data.posts.posts.map((post) => (
                <tr key={post._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {post.title}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{post.subTitle}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{post.category}</div>
                  </td>

                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-500 max-w-xs truncate">
                      {post.priority}
                    </div>
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="flex justify-end gap-4">
                      <Link
                        to={`/adminauthor/${post._id}`}
                        className="text-blue-600 hover:text-blue-800 transition-colors"
                        title="View"
                      >
                        <FaEye className="h-5 w-5" />
                      </Link>
                      <button
                        onClick={() =>
                          findAuthorAndShowModel(post._id, setEditModel)
                        }
                        className="text-green-600 hover:text-green-800 transition-colors"
                        title="Edit"
                      >
                        <FaEdit className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() =>
                          findAuthorAndShowModel(post._id, setShowDeleteModel)
                        }
                        className="text-red-600 hover:text-red-800 transition-colors"
                        title="Delete"
                      >
                        <FaTrashAlt className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="px-6 py-4 text-center text-sm text-gray-500"
                >
                  No post yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AuthorPostTable;
