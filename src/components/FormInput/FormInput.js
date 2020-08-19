import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { neutral } from "../../settings";
import FormError from "../FormError/FormError";

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
        aria-label={name}
        name={name}
        type={type}
        ref={(e) => {
          register(e, { required, validate });
          if (inputRef) inputRef.current = e;
        }}
        aria-invalid={error ? "true" : "false"}
      />
      {error && error.type === "required" && (
        <FormError error={`${label} is required.`} />
      )}
      {error && error.type === "maxLength" && (
        <FormError error="Max length exceeded." />
      )}
      {error && error.message && <FormError error={error.message} />}
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
