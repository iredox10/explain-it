import React from "react";

const FormInput = ({ label, labelFor, name, type, onchange, value}) => {
  return (
    <div className="mb-4">
      <label 
        htmlFor={labelFor} 
        className="block text-sm font-medium text-primary-color mb-2 capitalize"
      >
        {label}
      </label>
      <input
        type={type}
        name={name}
        onChange={onchange}
        value={value}
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-color focus:border-primary-color bg-white transition duration-200 ease-in-out"
      />
    </div>
  );
};
export default FormInput;
