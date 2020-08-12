import React from "react";
import PropTypes from "prop-types";

const Button = ({ type, label, disabled, onClick = () => {} }) => {
  return (
    <>
      <button type={type} disabled={disabled} onClick={onClick}>
        {label}
      </button>
    </>
  );
};

Button.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
};

export default Button;
