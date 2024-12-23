import React from "react";
import { Link } from "react-router-dom";

const Header = ({ searchOnChange , title, subtitle}) => {
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
      <div className="m-5 text-white capitalize">
        <h1 className=" text-6xl font-bold">{title}</h1>
        <p>{subtitle}</p>
      </div>
      <div className=" absolute bottom-12 left-[50%] translate-x-[-50%]">
        <input
          type="search"
          name="search"
          id="search"
          className="px-6 py-2"
          placeholder="Search..."
          onChange={searchOnChange}
        />
      </div>
    </div>
  );
};

export default Header;
