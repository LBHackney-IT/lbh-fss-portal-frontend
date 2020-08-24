import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import FormError from "../FormError/FormError";

const StyledDiv = styled.div`
  display: flex; 
  flexDirection: row;
  justifyContent: space-between;
  margin: 20px 0;
`;

const StyledLabel = styled.label`
  display: block;
  margin: 0 0 5px 20px;
  font-size: 16px;
  font-weight: bold;
  padding-top: 5px;
  width: 80%;
`;

const StyledCheckbox = styled.input`
  display: block;
  width: 10%;
  height: 50px;
  margin-right: 5px;
`;

const FormCheckbox = ({ name, label, register, required, error, value }) => {
  return (
    <>
      <StyledDiv>
        <StyledCheckbox
          name={name}
          type="checkbox"
          ref={register({ required })}
          aria-invalid={error ? "true" : "false"}
          value={value}
        />
        <StyledLabel htmlFor={name}>{label}</StyledLabel>
      </StyledDiv>
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
