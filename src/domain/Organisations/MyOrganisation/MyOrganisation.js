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
    return <AccessDenied />;
  }

  return !user.organisation ? ( // <- will need to remove '!'
    //redirect to /services/:organisationId/edit/
    <h1>Redirect</h1>
  ) : (
    <EmptyOrganisation />
  );
};

export default MyOrganisation;
