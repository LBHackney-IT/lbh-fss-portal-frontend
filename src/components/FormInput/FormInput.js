import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { neutral } from "../../settings";

const StyledLabel = styled.label`
  display: block;
  margin-bottom: 5px;
  font-size: 19px;
  font-weight: bold;
`;

const StyledInput = styled.input`
  display: block;
  margin-bottom: 20px;
  max-width: 438px;
  width: 100%;
  height: 50px;
  border: 1px solid ${neutral[500]};
  padding: 15px;
`;

const StyledError = styled.span`
  display: block;
  margin-bottom: 20px;
  width: 100%;
`;

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
      <StyledLabel htmlFor={name}>{label}</StyledLabel>
      <StyledInput
        name={name}
        type={type}
        ref={(e) => {
          register(e, { required, validate });
          if (inputRef) inputRef.current = e;
        }}
        aria-invalid={error ? "true" : "false"}
      />
      {error && error.type === "required" && (
        <StyledError role="alert">{label} is required.</StyledError>
      )}
      {error && error.type === "maxLength" && (
        <StyledError role="alert">Max length exceeded.</StyledError>
      )}
      {error && error.message && (
        <StyledError role="alert">{error.message}</StyledError>
      )}
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
