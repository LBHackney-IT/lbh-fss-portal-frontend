import React from "react";
import { Link } from "@reach/router";

const ButtonLink = ({ label, to }) => {
  return <Link to={to}>{label}</Link>;
};

export default ButtonLink;
