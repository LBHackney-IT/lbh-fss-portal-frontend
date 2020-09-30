import React, { useContext } from "react";
import ButtonLink from "../../../components/ButtonLink/ButtonLink";
import UserContext from "../../../context/UserContext/UserContext";
import AccessDenied from "../../Error/AccessDenied/AccessDenied";

const ListServices = () => {
  const { roles } = useContext(UserContext)[0];

  const accessPermission = roles.includes("viewer") || roles.includes("admin");

  return accessPermission ? (
    <>
      <h1>Services</h1>
      <ButtonLink label="Add service" to="/services/add" />
    </>
  ) : (
    <AccessDenied />
  );
};

export default ListServices;
