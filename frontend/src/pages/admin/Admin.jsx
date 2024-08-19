import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import axios from "axios";
import { path } from "../../utils/path";
import { Link, NavLink } from "react-router-dom";
import FormInput from "../../components/FormInput";
import FormBtn from "../../components/FormBtn";
import Form from "../../components/Form";

const Admin = () => {
  return(
    <div>
      <NavLink to='/admin/categories'>Admin categories</NavLink>
      <NavLink to='/admin/authors'>Authors</NavLink>
      <NavLink to='/admin/drafts'>Drafts</NavLink>
    </div>
  )
};

export default Admin;
