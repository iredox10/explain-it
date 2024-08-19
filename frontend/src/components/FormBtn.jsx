import React from "react";

const FormBtn = ({ text }) => {
  return (
    <div className="flex justify-center ">
      <button className="px-6 py-2 text-white bg-primary-color capitalize w-[80%] mx-auto">
        {text}
      </button>
    </div>
  );
};

export default FormBtn;
