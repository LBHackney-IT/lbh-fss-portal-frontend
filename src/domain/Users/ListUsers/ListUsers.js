import React from "react";
import { Link } from "@reach/router";
import UserTable from "../UserTable/UserTable";

const ListUsers = ({ location }) => {
  return (
    <>
      <div>
        <h1>Users</h1>
        <Link to="/users/add">Add user</Link>
      </div>
      <UserTable />
    </>
  );
};

export default ListUsers;
