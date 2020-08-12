import React, { useContext } from "react";
import NavLink from "../NavLink/NavLink";
import PropTypes from "prop-types";
import UserContext from "../../context/UserContext/UserContext";

const ProtectedLayout = ({ children }) => {
  const { organisation } = useContext(UserContext)[0];

  return (
    <div>
      <div>
        <div>
          <div>Your organisation</div>
          <div>{organisation.name}</div>
        </div>
        <nav>
          <NavLink to="/services">Services</NavLink>
          <NavLink to="/users">Users</NavLink>
          <NavLink to="/account">My account</NavLink>
          <NavLink to="/analytics">Analytics</NavLink>
          <NavLink to="/logout">Log out</NavLink>
        </nav>
      </div>
      {children}
      <div>
        If you need support please email:{" "}
        <a href="mailto:team@hackneymap.gov.uk">team@hackneymap.gov.uk</a>
      </div>
    </div>
  );
};

ProtectedLayout.propTypes = {
  children: PropTypes.node,
};

export default ProtectedLayout;
