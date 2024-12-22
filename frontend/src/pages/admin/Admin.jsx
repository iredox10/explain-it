import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import axios from "axios";
import { path } from "../../utils/path";
import { Link, NavLink } from "react-router-dom";
import FormInput from "../../components/FormInput";
import FormBtn from "../../components/FormBtn";
import Form from "../../components/Form";

const Admin = () => {
  return (
    <div>
      <Header />
      <div className="md:absolute top-[11rem] flex flex-col md:flex-row justify-center w-full gap-5  text-center">
        <div className="bg-white p-8 capitalize">
          <NavLink to="/admin/categories">Admin categories</NavLink>
        </div>

        <div className="bg-white p-8 capitalize">
          <NavLink to="/admin/authors">Authors</NavLink>
        </div>

        <div className="bg-white p-8 capitalize">
          <NavLink to="/admin/drafts">Drafts</NavLink>
        </div>
      </div>
    </div>
  );
};

export default Admin;
