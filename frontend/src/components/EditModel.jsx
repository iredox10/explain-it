import React from "react";

const EditModel = ({ children }) => {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 p-1">
        {children}
      </div>
    </div>
  );
};

export default EditModel;
