import React from "react";
import PropTypes from "prop-types";

const Input = ({ type, name, label, register, required, error }) => {
  return (
    <>
      <label htmlFor={name}>{label}</label>
      <input
        name={name}
        type={type}
        ref={register({ required })}
        aria-invalid={error ? "true" : "false"}
      />
      {error && error.type === "required" && (
        <span role="alert">This is required</span>
      )}
      {error && error.type === "maxLength" && (
        <span role="alert">Max length exceeded</span>
      )}
    </>
  );
};

Input.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.string,
  register: PropTypes.func,
  required: PropTypes.bool,
  error: PropTypes.object,
};

export default Input;
