import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { neutral } from "../../settings";
import FormError from "../FormError/FormError";
import { grey } from "../../settings";

const StyledLabel = styled.label`
  display: block;
  margin-bottom: 5px;
  font-size: 19px;
  color: ${grey[400]};
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

const StyledHelp = styled.p``;

const FormInput = ({
  type,
  name,
  label,
  register,
  required,
  maxLength,
  minLength,
  error,
  inputRef,
  validate,
  help,
  placeholder,
}) => {
  return (
    <>
      <StyledLabel htmlFor={name}>{label}</StyledLabel>
      {help ? <StyledHelp>{help}</StyledHelp> : ""}
      <StyledInput
        aria-label={name}
        name={name}
        type={type}
        placeholder={placeholder}
        ref={(e) => {
          register(e, { required, minLength, maxLength, validate });
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
      {error && error.type === "minLength" && (
        <FormError
          error={`${label} must be at least ${minLength} ${
            type === "number" ? "digits" : "characters"
          }.`}
        />
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
  maxLength: PropTypes.number,
  minLength: PropTypes.number,
  error: PropTypes.object,
};

export default FormInput;
