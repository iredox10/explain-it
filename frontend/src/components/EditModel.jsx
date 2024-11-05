import React from "react";

const EditModel = ({ children }) => {
  return (
    <div className="absolute left-[50%] translate-x-[-50%] w-full bg-secondary-color/60 top-0 bottom-0 ">
      <div className="flex place-content-center my-[7rem]">{children}</div>
    </div>
  );
};

export default EditModel;
