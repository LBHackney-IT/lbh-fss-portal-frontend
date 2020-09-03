import React, { useContext } from "react";
import UserContext from "../../../context/UserContext/UserContext";
import EmptyOrganisation from "../EmptyOrganisation/EmptyOrganisation";

const MyOrganisation = () => {
  const localUser = useContext(UserContext)[0];

  if (true) {
    return <EmptyOrganisation />;
  }

  return <></>;
};

export default MyOrganisation;
