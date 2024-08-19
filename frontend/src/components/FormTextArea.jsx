import React, { forwardRef } from "react";

const FormTextArea = ({ label, labelFor, name, id, onchange }) => {
  return (
    <div className="my-3 capitalize">
      <label htmlFor={labelFor} className="my-3 text-primary-color">
        {label}
      </label>
      <textarea
        name={name}
        id={id}
        cols="30"
        rows="10"
        className="w-full p-1 border-2 border-primary-color bg-secondary-color"
        onChange={onchange}
      ></textarea>
    </div>
  );
};

export default FormTextArea;

// const FormTextArea = forwardRef(({ label, labelFor, name, id, onchange }) => {
//   return (
//     <div className="my-3 capitalize">
//       <label htmlFor={labelFor} className="my-3 text-primary-color">
//         {label}
//       </label>
//       <textarea
//         name={name}
//         id={id}
//         cols="30"
//         rows="10"
//         className="w-full p-1 border-2 border-primary-color bg-secondary-color"
//         onChange={onchange}
//       ></textarea>
//     </div>
//   );
// });

