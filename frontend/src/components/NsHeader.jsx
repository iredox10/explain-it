
import React from "react";


const NsHeader = ({headerText}) => {
  return (
    <div className="relative bg-primary-color p-2 md:p-5 min-h-[12rem]  w-full ">
      <div className="flex justify-between ">
        <h1>logo</h1>
        <div className="flex">
          <p>links</p>
          <p>links</p>
          <p>links</p>
        </div>
      </div>
      <h1 className="ml-10 mt-4 capitalize text-4xl text-white font-bold">{headerText}</h1>
    </div>
  );
};

export default NsHeader;
