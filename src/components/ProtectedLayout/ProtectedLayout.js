import React from "react";
import NavLink from "../NavLink/NavLink";
import PropTypes from "prop-types";
import StatusMessage from "../StatusMessage/StatusMessage";

const ProtectedLayout = ({ children, location }) => {
  const redirectMessage =
    location && location.state && location.state.data
      ? location.state.data.redirectMessage
      : false;

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
          <NavLink to="/account">My account</NavLink>
          <NavLink to="/analytics">Analytics</NavLink>
          <NavLink to="/logout">Log out</NavLink>
        </nav>
      </div>
      {redirectMessage ? (
        <StatusMessage
          type={redirectMessage.type}
          message={redirectMessage.message}
        />
      ) : (
        ""
      )}
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
