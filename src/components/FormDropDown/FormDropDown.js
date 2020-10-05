import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import FormError from "../FormError/FormError";
import { neutral } from "../../settings";
import { breakpoint } from "../../utils/breakpoint/breakpoint";

const StyledLabel = styled.label`
  display: block;
  margin-bottom: 5px;
  font-size: 19px;
  color: black;
`;

const StyledSelect = styled.select`
  display: block;
  margin: ${(props) => props.selectMarginMobile};
  ${breakpoint("md")`
     margin: ${(props) => props.selectMarginMedium};  
  `};
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
  selectMarginMobile = "20px 0 0 0",
  selectMarginMedium = "20px 0 0 0",
}) => {
  return (
    <>
      <StyledLabel htmlFor={name}>{label}</StyledLabel>
      <StyledSelect
        name={name}
        ref={register({ required })}
        onChange={onChange}
        style={selectStyle}
        selectMarginMobile={selectMarginMobile}
        selectMarginMedium={selectMarginMedium}
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
