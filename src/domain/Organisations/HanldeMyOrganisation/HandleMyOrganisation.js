import React, { useContext } from "react";
import { Redirect } from "@reach/router";
import UserContext from "../../../context/UserContext/UserContext";
import EmptyOrganisation from "../EmptyOrganisation/EmptyOrganisation";
import MyOrganisation from "../MyOrganisation/MyOrganisation";

const HandleMyOrganisation = () => {
  const user = useContext(UserContext)[0];

  const isInternalTeam =
    user.roles.includes("viewer") || user.roles.includes("admin");

  if (user.setPasswordRequired) {
    return <Redirect to="/account" noThrow />;
  }

  if (isInternalTeam) {
    return <Redirect to="/organisations" noThrow />;
  }

  return user.organisation ? <MyOrganisation /> : <EmptyOrganisation />;
};

export default HandleMyOrganisation;
