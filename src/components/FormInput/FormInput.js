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
  color: black;
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

const StyledHelp = styled.p`
  color: ${grey[400]};
  margin: 5px 0 20px 0;
`;

const FormInput = ({
  type,
  name,
  label,
  register,
  required,
  maxLength,
  minLength,
  onChange = () => {},
  error,
  inputRef,
  validate,
  help,
  placeholder,
  labelStyle,
  autoComplete = "on",
  spellCheck = "false",
  disabled,
}) => {
  return (
    <>
      <StyledLabel htmlFor={name} style={labelStyle}>
        {label}
      </StyledLabel>
      {help ? <StyledHelp>{help}</StyledHelp> : ""}
      <StyledInput
        onChange={onChange}
        aria-label={name}
        name={name}
        type={type}
        placeholder={placeholder}
        ref={(e) => {
          register(e, { required, minLength, maxLength, validate });
          if (inputRef) inputRef.current = e;
        }}
        aria-invalid={error ? "true" : "false"}
        spellCheck={spellCheck}
        autoComplete={autoComplete}
        disabled={disabled}
      />
      {error && error.type === "required" && (
        <FormError error={`${label} is required.`} />
      )}
      {error && error.type === "maxLength" && (
        <FormError error={`Max length of ${maxLength} characters exceeded.`} />
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
  disabled: PropTypes.bool,
};

export default FormInput;
