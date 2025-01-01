import React from 'react'
import { FaEdit, FaEye, FaPlus, FaTrashAlt } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const Card = ({categories,model,deleteModel}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-md">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Posts</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {categories && categories.map((category) => (
              <tr key={categories._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{category.name}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-500 max-w-xs truncate">{category.about}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                    {category.priority}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{category.posts?.length || 0}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">
                    {new Date(category.createdAt).toLocaleDateString()}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <div className="flex justify-end gap-4">
                    <Link
                      to={`/admin/category/${category.slug}`}
                      className="text-blue-600 hover:text-blue-800 transition-colors"
                      title="View"
                    >
                      <FaEye className="h-5 w-5" />
                    </Link>

                    <button
                      type="button"
                      onClick={() => model(category.slug)}
                      className="text-green-600 hover:text-green-800 transition-colors"
                      title="Edit"
                    >
                      <FaEdit className="h-5 w-5" />
                    </button>

                    <button
                      onClick={() => deleteModel(category.slug)}
                      className="text-red-600 hover:text-red-800 transition-colors"
                      title="Delete"
                    >
                      <FaTrashAlt className="h-5 w-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Card