import React from "react";

const DeleteModel = ({ name, setModel, setDelete }) => {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
        <div className="border border-primary-color rounded-lg overflow-hidden">
          <h1 className="bg-primary-color p-6 text-xl font-semibold text-white text-center">
            Are you sure you want to delete "{name ? name : ""}"?
          </h1>
          <div className="flex justify-center gap-4 p-6">
            <button 
              onClick={setModel}
              className="px-6 py-2 rounded-md border-2 border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors font-medium"
            >
              Cancel
            </button>
            <button 
              onClick={setDelete}
              className="px-6 py-2 rounded-md bg-red-500 text-white hover:bg-red-600 transition-colors font-medium"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModel;
