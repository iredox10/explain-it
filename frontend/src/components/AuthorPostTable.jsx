import React from "react";
import { Link } from "react-router-dom";

const AuthorPostTable = ({data}) => {
  console.log(data && data.posts)
  return (
    <table className="min-w-full capitalize bg-white border border-gray-200 rounded-lg shadow-md">
      <thead>
        <tr className="bg-gray-200 text-gray-700 uppercase text-sm">
          <th className="py-3 px-4 text-left">title</th>
          <th className="py-3 px-4 text-left">category</th>
          <th className="py-3 px-4 text-left">Action</th>
        </tr>
      </thead>
      <tbody>
        {data &&
          data.posts.posts.map((post, index) => (
            <tr key={index} className="hover:bg-gray-100">
              <td className="py-3 px-4 border-b border-gray-200">
                {post.title}
              </td>
              <td className="py-3 px-4 border-b border-gray-200">
                {post.category}
              </td>
              <td className="py-3 px-4 border-b border-gray-200 flex items-center gap-2">
                <Link to={`/post/${post._id}`} className="bg-primary-color text-white px-4 py-1">View</Link>
                <Link className="bg-teal-500 text-white px-4 py-1">Edit</Link>
                <Link to={`/edit-post/${draft._id}`}>view</Link>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default AuthorPostTable;
