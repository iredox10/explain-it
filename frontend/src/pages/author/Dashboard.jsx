import React from "react";
import Header from "../../components/Header";
import { NavLink, useParams } from "react-router-dom";
import AuthorHeader from "../../components/AuthorHeader";
import useFetch from "../../hooks/useFetch";
import { path } from "../../utils/path";

const Dashboard = () => {
  const { id } = useParams();
  const { data: author, loading, err } = useFetch(`${path}/get-author/${id}`);
  return (
    <div>
      <AuthorHeader />

      <div>
        <div className="absolute top-[4rem] pl-10">
          {author && (
            <div className="capitalize text-white font-bold flex flex-col gap-2">
              <p>
                fullname: <span>{author.author.fullname}</span>
              </p>
              <p>
                username: <span>{author.author.username}</span>
              </p>
              <p>
                position: <span>{author.author.position}</span>
              </p>
              <p>
                facebook: <span>{author.author.facebook}</span>
              </p>
              <p>
                twitter: <span>{author.author.twitter}</span>
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="p-10 my-4 text-center flex w-full  gap-5">
        <div className="w-full bg-white p-14 capitalize text-2xl font-bold hover:text-primary-color">
          <NavLink to={`/author/${id}`}>Posts</NavLink>
        </div>

        <div className="w-full bg-white p-14 capitalize font-bold text-2xl hover:text-primary-color">
          <NavLink to={`/author-drafts/${id}`}>Drafts</NavLink>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
