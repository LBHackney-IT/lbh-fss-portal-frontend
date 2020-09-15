import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import FormError from "../FormError/FormError";

const StyledLabel = styled.label`
  display: block;
  margin-bottom: 5px;
`;

const StyledCheckbox = styled.input`
  margin-right: 5px;
`;

const FormCheckbox = ({
  name,
  label,
  register,
  required,
  error,
  value,
  onClick = () => {},
}) => {
  return (
    <>
      <StyledLabel>
        <StyledCheckbox
          name={name}
          type="checkbox"
          ref={register({ required })}
          aria-invalid={error ? "true" : "false"}
          value={value}
          onClick={onClick}
        />
        {label}
      </StyledLabel>
      {error && error.type === "required" && (
        <FormError error="This is required" />
      )}
    </>
  );
};

FormCheckbox.propTypes = {
  name: PropTypes.string,
};

export default FormCheckbox;
