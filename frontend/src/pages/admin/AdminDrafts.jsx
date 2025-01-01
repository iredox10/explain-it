import axios from "axios";
import useFetch from "../../hooks/useFetch";
import { path } from "../../utils/path";
import { useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import Header from "../../components/Header";
import HeaderText from "../../components/HeaderText";

const AdminDrafts = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const { data, loading, err } = useFetch(
    `${path}/get-user-drafts/${user._id}`
  );
  console.log(data);

  return (
    <div>
      <Header title={"Drafts"} subtitle={"list of Drafts"} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-md">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {data && data.drafts.map((draft) => (
                <tr key={draft._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{draft.title}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{draft.category}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="flex justify-end gap-4">
                      <NavLink
                        to={`/drafted-post/${draft._id}`}
                        className="text-blue-600 hover:text-blue-800 transition-colors"
                        title="View Draft"
                      >
                        <FaEye className="h-5 w-5" />
                      </NavLink>
                    </div>
                  </td>
                </tr>
              ))}
              {data && data.drafts.length === 0 && (
                <tr>
                  <td colSpan="3" className="px-6 py-4 text-center text-gray-500">
                    No Drafts Yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>

        </div>
      </div>
    </div>
  );
};

export default AdminDrafts;
