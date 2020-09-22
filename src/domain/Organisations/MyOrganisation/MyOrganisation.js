import React, { useContext } from "react";
import UserContext from "../../../context/UserContext/UserContext";
import EmptyOrganisation from "../EmptyOrganisation/EmptyOrganisation";
import AccessDenied from "../../Error/AccessDenied/AccessDenied";
import EditOrganisation from "../EditOrganisation/EditOrganisation";
import { Redirect } from "@reach/router";

const MyOrganisation = () => {
  const user = useContext(UserContext)[0];

  const isInternalTeam =
    user.roles.includes("viewer") || user.roles.includes("admin");

  if (isInternalTeam) {
    return <Redirect to="/organisations" noThrow />;
  }

  return false ? ( // <- will need to remove '!'
    <Redirect to={`/organisations/${user.organisation.id}/edit`} noThrow />
  ) : (
    <EmptyOrganisation />
  );
};

export default MyOrganisation;
