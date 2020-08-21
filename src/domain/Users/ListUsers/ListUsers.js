import React, { useContext } from "react";
import { Link } from "@reach/router";
import UserTable from "../UserTable/UserTable";
import UserContext from "../../../context/UserContext/UserContext"
import AccessDenied from "../../Error/AccessDenied/AccessDenied"

const ListUsers = ({ location }) => {

  const { roles } = useContext(UserContext)[0];

  const accessPermission = roles.includes('hackney_viewer') || roles.includes('hackney_admin')

  return accessPermission ? (
    <>
      <div>
        <h1>Users</h1>
        <Link to="/users/add">Add user</Link>
      </div>
      <UserTable /> :
    </>
  ) : (
      <AccessDenied />
    )
};

export default ListUsers;
