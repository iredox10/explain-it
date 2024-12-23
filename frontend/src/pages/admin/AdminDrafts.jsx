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
      <div className="p-10">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-200 text-gray-700 uppercase text-sm">
              <th className="py-3 px-4 text-left">title</th>
              <th className="py-3 px-4 text-left">category</th>
              <th className="py-3 px-4 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.drafts.map((draft, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="py-3 px-4 border-b border-gray-200">
                    {draft.title}
                  </td>
                  <td className="py-3 px-4 border-b border-gray-200">
                    {draft.category}
                  </td>
                  <td className="py-3 px-4 border-b border-gray-200">
                    <Link to={`/drafted-post/${draft._id}`}>view</Link>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        {data && data.drafts.length <= 0 ? "No Draft Yet" : ""}
      </div>
    </div>
  );
};

export default AdminDrafts;
