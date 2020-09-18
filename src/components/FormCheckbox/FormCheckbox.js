import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import FormError from "../FormError/FormError";

const StyledDiv = styled.div`
  display: flex;
  flex-direction: row;
  margin: 20px 0;
`;

const StyledLabel = styled.label`
  display: block;
  padding-top: 5px;
  font-weight: normal;
  font-size: 19px;
  margin: 5px 0 5px 10px;
`;

const StyledCheckbox = styled.input`
  display: block;
  width: 35px;
  height: 35px;
  margin-right: 5px;
`;

const FormCheckbox = ({
  name,
  label,
  register,
  required,
  error,
  value,
  dataTestid,
}) => {
  return (
    <>
      <StyledDiv>
        <StyledCheckbox
          name={name}
          type="checkbox"
          ref={register({ required })}
          aria-invalid={error ? "true" : "false"}
          value={value}
          data-testid={dataTestid}
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
