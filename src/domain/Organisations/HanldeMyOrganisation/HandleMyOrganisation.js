import React, { useContext } from "react";
import { Redirect } from "@reach/router";
import UserContext from "../../../context/UserContext/UserContext";
import EmptyOrganisation from "../EmptyOrganisation/EmptyOrganisation";
import MyOrganisation from "../MyOrganisation/MyOrganisation";
import { checkIsInternalTeam } from "../../../utils/functions/functions";

const HandleMyOrganisation = () => {
  const user = useContext(UserContext)[0];

  const isInternalTeam = checkIsInternalTeam(user.roles);


  if (isInternalTeam) {
    return <Redirect to="/organisations" noThrow />;
  }

  return user.organisation ? <MyOrganisation /> : <EmptyOrganisation />;
};

export default HandleMyOrganisation;
