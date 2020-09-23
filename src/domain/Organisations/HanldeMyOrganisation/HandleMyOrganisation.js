import React, { useContext } from "react";
import UserContext from "../../../context/UserContext/UserContext";
import EmptyOrganisation from "../EmptyOrganisation/EmptyOrganisation";
import MyOrganisation from "../MyOrganisation/MyOrganisation";

const HandleMyOrganisation = () => {
  const user = useContext(UserContext)[0];

  return user.organisation ? <MyOrganisation /> : <EmptyOrganisation />;
};

export default HandleMyOrganisation;
