import React from 'react'
import { FaEdit, FaEye, FaPlus, FaTrashAlt } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const Card = ({categories,model,deleteModel}) => {
  return (
    <div className="md:absolute w-full top-[9rem] grid md:grid-cols-5 gap-5 text-center p-2 md:p-5">
      {categories &&
        categories.map((category) => (
          <div
            className="bg-secondary-color drop-shadow-2xl px-4 pt-10 pb-7 capitalize"
            key={categories._id}
          >
            <p className="font-bold my-8 ">{category.name}</p>
            <div className="text-center flex w-full justify-center gap-5">
              <Link
                to={`/admin/category/${category.slug}`}
                className="text-center"
              >
                <p className="text-center flex flex-col text-primary-color ">
                  <div className="flex w-full justify-center">
                    <FaEye className="" />
                  </div>
                  <span>view</span>
                </p>
              </Link>
              <button type="button" onClick={() => model(category.slug)}>
                <p className="text-center flex flex-col text-primary-color">
                  <div className="flex w-full justify-center">
                    <FaEdit className="" />
                  </div>
                  <span>edit</span>
                </p>
              </button>
              <button onClick={() => deleteModel(category.slug)}>
                <p className="text-center flex flex-col text-red-600 ">
                  <div className="flex w-full justify-center">
                    <FaTrashAlt className="" />
                  </div>
                  <span>delete</span>
                </p>
              </button>
            </div>
          </div>
        ))}
    </div>
  );
}

export default Card