import React from "react";
import { NavLink, useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { path } from "../../utils/path";
import Header from "../../components/Header";

const Drafts = () => {
  const { id } = useParams();
    console.log(id)
  const { data, loading, err } = useFetch(
    `${path}/get-user-drafts/${id}`
  );
  console.log(data)
  return (
    <div>
        <Header />
      {/* {user.username} drafts */}
      <div>
        {data &&
          data.drafts.map((draft) => (
            <div key={draft._id}>
              <NavLink to={`/drafted-post/${draft._id}`}>{draft.title}</NavLink>
            </div>
          ))}
          {data && data.drafts.length == 0 ? 'No Draft Yet' : ''}
      </div>
    </div>
  );
};

export default Drafts;
