import React from "react";
import PropTypes from "prop-types";

const FormInput = ({
  type,
  name,
  label,
  register,
  required,
  error,
  inputRef,
  validate,
}) => {
  return (
    <>
      <label htmlFor={name}>{label}</label>
      <input
        name={name}
        type={type}
        ref={(e) => {
          register(e, { required, validate });
          if (inputRef) inputRef.current = e;
        }}
        aria-invalid={error ? "true" : "false"}
      />
      {error && error.type === "required" && (
        <span role="alert">{label} is required.</span>
      )}
      {error && error.type === "maxLength" && (
        <span role="alert">Max length exceeded.</span>
      )}
      {error && error.message && <span role="alert">{error.message}</span>}
    </>
  );
};

FormInput.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.string,
  register: PropTypes.func,
  required: PropTypes.bool,
  error: PropTypes.object,
};

export default FormInput;
