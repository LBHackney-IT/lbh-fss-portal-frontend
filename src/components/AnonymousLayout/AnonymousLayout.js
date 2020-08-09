import React from "react";
import PropTypes from "prop-types";

const AnonymousLayout = ({ children }) => {
  return (
    <div>
      <div>
        <div>Find support services</div>
        {children}
      </div>
    </div>
  );
};

AnonymousLayout.propTypes = {
  children: PropTypes.node,
};

export default AnonymousLayout;
