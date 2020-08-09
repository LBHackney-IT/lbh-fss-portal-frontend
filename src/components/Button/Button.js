import React from "react";
import PropTypes from "prop-types";

const Button = ({ type, label, disabled }) => {
  return (
    <>
      <button type={type} disabled={disabled}>
        {label}
      </button>
    </>
  );
};

Button.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string,
  disabled: PropTypes.bool,
};

export default Button;
