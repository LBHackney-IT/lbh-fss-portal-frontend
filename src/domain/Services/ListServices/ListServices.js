import React, { useContext } from "react";
import ButtonLink from "../../../components/ButtonLink/ButtonLink";
import UserContext from "../../../context/UserContext/UserContext";
import { checkIsInternalTeam } from "../../../utils/functions/functions";
import AccessDenied from "../../Error/AccessDenied/AccessDenied";

const ListServices = () => {
  const { roles } = useContext(UserContext)[0];

  const isInternalTeam = checkIsInternalTeam(roles);

  return isInternalTeam ? (
    <>
      <h1>Services</h1>
      <ButtonLink label="Add service" to="/services/add" />
    </>
  ) : (
    <AccessDenied />
  );
};

export default ListServices;
