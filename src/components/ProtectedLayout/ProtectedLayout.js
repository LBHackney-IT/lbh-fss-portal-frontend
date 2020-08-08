import React from "react";
import NavLink from "../NavLink/NavLink";

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

export default ProtectedLayout;
