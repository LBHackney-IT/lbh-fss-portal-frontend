import React from "react";
import { Link } from "@reach/router";

const ListUsers = () => {
  return (
    <>
      <div>
        <h1>Users</h1>
        <Link to="/users/add">Add user</Link>
      </div>
    </>
  );
};

export default ListUsers;
