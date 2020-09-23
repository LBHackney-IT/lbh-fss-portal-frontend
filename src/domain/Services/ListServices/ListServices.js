import React from "react";
import ButtonLink from "../../../components/ButtonLink/ButtonLink";
import DigitalGuideInfo from "../DigitalGuideInfo/DigitalGuideInfo";

const ListServices = () => {
  return (
    <>
      <h1>Services</h1>
      <ButtonLink label="Add service" to="/services/add" />
    </>
  );
};

export default ListServices;
