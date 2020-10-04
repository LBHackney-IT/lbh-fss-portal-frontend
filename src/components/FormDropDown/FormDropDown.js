import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import FormError from "../FormError/FormError";
import { neutral } from "../../settings";

const StyledLabel = styled.label`
  display: block;
  margin-bottom: 5px;
  font-size: 19px;
  color: black;
`;

const StyledSelect = styled.select`
  display: block;
  margin-bottom: 20px;
  max-width: 438px;
  width: 100%;
  height: 50px;
  border: 1px solid ${neutral[500]};
  padding: 10px;
`;

const StyledOption = styled.option``;

const FormDropDown = ({
  label,
  name,
  options,
  values,
  required,
  error,
  register,
  onChange = () => {},
  includeBlankValue = true,
  selectStyle,
}) => {
  return (
    <>
      <StyledLabel htmlFor={name}>{label}</StyledLabel>
      <StyledSelect
        name={name}
        ref={register({ required })}
        onChange={onChange}
        style={selectStyle}
      >
        {includeBlankValue ? (
          <StyledOption value="" defaultValue></StyledOption>
        ) : null}
        {options.map((option, index) => {
          return (
            <StyledOption key={option} value={values ? values[index] : option}>
              {option}
            </StyledOption>
          );
        })}
      </StyledSelect>
      {error && error.type === "required" && (
        <FormError
          error={`${label} is required`}
          marginTop="10px"
          marginBottom="20px"
        />
      )}
      {error && error.message && <FormError error={error.message} />}
    </>
  );
};

FormDropDown.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  options: PropTypes.array,
};

export default FormDropDown;
