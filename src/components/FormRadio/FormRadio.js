import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import FormError from "../FormError/FormError";

const StyledDiv = styled.div`
  display: flex;
  align-items: center;
`;

const StyledLabel = styled.label`
  width: 80%;
  display: block;
  font-weight: normal;
  font-size: 19px;
  margin-left: 5px;
`;

const StyledRadio = styled.input`
  width: 20%;
  display: block;
  width: 50px;
  height: 50px;
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
    <StyledDiv>
      <StyledRadio
        name={name}
        type="radio"
        ref={register({ required })}
        aria-invalid={error ? "true" : "false"}
        value={value}
        onClick={onClick}
      />
      <StyledLabel htmlFor={name}>{label}</StyledLabel>
      {error && error.message && <FormError error={error.message} />}
    </StyledDiv>
  );
};

FormCheckbox.propTypes = {
  name: PropTypes.string,
};

export default FormCheckbox;
