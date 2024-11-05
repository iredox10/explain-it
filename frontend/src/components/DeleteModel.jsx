import React from "react";

const DeleteModel = ({ name, setModel, setDelete }) => {
  return (
    <div className="absolute left-[50%] translate-x-[-50%] w-full bg-secondary-color/60 top-0 bottom-0 ">
      <div className="flex place-content-center my-[7rem]   ">
        <div className=" border-2 border-primary-color">
          <h1 className="bg-primary-color p-5 capitalize text-white">
            are you sure you want to delete {name ? name : ""}
          </h1>
          <div className="flex justify-between p-9">
            <button onClick={setModel}>No</button>
            <button onClick={setDelete}>Yes</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModel;
