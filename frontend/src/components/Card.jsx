import React from 'react'
import { FaEdit, FaEye, FaPlus, FaTrashAlt } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const Card = ({categories,model,deleteModel}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {categories &&
          categories.map((category) => (
            <div
              key={categories._id}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden"
            >
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{category.name}</h3>
                <div className="flex justify-center gap-4">
                  <Link
                    to={`/admin/category/${category.slug}`}
                    className="flex flex-col items-center text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    <FaEye className="h-5 w-5 mb-1" />
                    <span className="text-sm">View</span>
                  </Link>

                  <button 
                    type="button" 
                    onClick={() => model(category.slug)}
                    className="flex flex-col items-center text-green-600 hover:text-green-800 transition-colors"
                  >
                    <FaEdit className="h-5 w-5 mb-1" />
                    <span className="text-sm">Edit</span>
                  </button>

                  <button
                    onClick={() => deleteModel(category.slug)}
                    className="flex flex-col items-center text-red-600 hover:text-red-800 transition-colors"
                  >
                    <FaTrashAlt className="h-5 w-5 mb-1" />
                    <span className="text-sm">Delete</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Card