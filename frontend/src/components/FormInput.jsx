import React from "react";

const FormInput = ({ label, labelFor, name, type, onchange, value}) => {
  return (
    <div className="my-3 capitalize">
      <label htmlFor={labelFor} className="my-3 text-primary-color">
        {label}
      </label>
      <input
        type={type}
        name={name}
        onChange={onchange}
        value={value}
        className="w-full p-1 border-2 border-primary-color bg-secondary-color"
      />
    </div>
  );
};
export default FormInput;
