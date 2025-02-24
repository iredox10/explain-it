import axios from "axios";
import useFetch from "../../hooks/useFetch";
import { path } from "../../utils/path";
import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Header from "../../components/Header";
import HeaderText from "../../components/HeaderText";
import { FaEye, FaTrash, FaTrashAlt } from "react-icons/fa";

const AdminDrafts = () => {
  const [deleteModel, setDeleteModel] = useState(false);
  const [loading, setLoading] = useState(false);
  const [draftName, setDraftName] = useState("");
  const [draftId, setDraftId] = useState('')
  const [drafts, setDrafts] = useState([])

  const user = JSON.parse(localStorage.getItem("user"));

  // const {
  //   data,
  //   loading: userLoading,
  //   err,
  // } = useFetch(`${path}/get-user-drafts/${user._id}`);


  const fetchDrafts = async () => {
    try {
      const res = await axios(`${path}/get-user-drafts/${user._id}`);
      setDrafts(res.data.drafts);
      console.log(res.data.drafts);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() =>{
    fetchDrafts()
  },[])

  const showDeleteModel = async (id) => {
    console.log(id);
    try {
      const res = await axios.get(`${path}/get-draft/${id}`);
      console.log(res.data);
      if (res.status == 200) {
        setDeleteModel(true);
        setLoading(true);
        setTimeout(() => {
          setDraftName(res.data.title);
          setDraftId(res.data._id);
          setLoading(false);
        }, 1000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    const token = JSON.parse(localStorage.getItem("jwtToken"));
    try {
      const res = await axios.delete(`${path}/delete-draft/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status == 200) {
        setDeleteModel(false);
         fetchDrafts();
      }
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Header title={"Drafts"} subtitle={"list of Drafts"} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-md">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {drafts && drafts.map((draft) => (
                  <tr key={draft._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {draft.title}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {draft.category}
                      </div>
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
                        <button
                          className="text-blue-600 hover:text-blue-800 transition-colors"
                          onClick={() => showDeleteModel(draft._id)}
                        >
                          <FaTrashAlt className="h-5 w-5 text-red-600" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              {drafts && drafts.length === 0 && (
                <tr>
                  <td
                    colSpan="3"
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    No Drafts Yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {deleteModel && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center">
          {loading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-color border-t-transparent"></div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
              <div className="border border-primary-color rounded-lg overflow-hidden">
                <h1 className="bg-primary-color p-6 text-xl font-semibold text-white text-center">
                  Are you sure you want to delete "{draftName}"?
                </h1>
                <div className="flex justify-center gap-4 p-6">
                  <button
                    onClick={() => setDeleteModel(false)}
                    className="px-6 py-2 rounded-md border-2 border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleDelete(draftId)}
                    className="px-6 py-2 rounded-md bg-red-500 text-white hover:bg-red-600 transition-colors font-medium"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminDrafts;
