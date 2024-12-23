import React from "react";
import Header from "../../components/Header";
import { NavLink, useParams } from "react-router-dom";

const Dashboard = () => {
  const { id } = useParams();
  return (
    <div>
      <Header />
      <div className="md:absolute top-[11rem] flex flex-col md:flex-row justify-center w-full gap-5  text-center">
        <div className="bg-white p-8 capitalize">
          <NavLink to={`/author/${id}`}>Posts</NavLink>
        </div>

        <div className="bg-white p-8 capitalize">
          <NavLink to={`/author-drafts/${id}`}>Drafts</NavLink>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
