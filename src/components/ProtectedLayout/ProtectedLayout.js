import React from "react";
import NavLink from "../NavLink/NavLink";
import PropTypes from "prop-types";

const ProtectedLayout = ({ children }) => {
  return (
    <div>
      <div>
        <div>
          <div>Your organisation</div>
          <div>Your organisation name</div>
        </div>
        <nav>
          <NavLink to="/services">Services</NavLink>
          <NavLink to="/users">Users</NavLink>
          <NavLink to="/users/account">My account</NavLink>
          <NavLink to="/analytics">Analytics</NavLink>
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
