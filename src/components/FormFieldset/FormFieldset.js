import React from "react";
import styled from "styled-components";

const StyledFieldset = styled.fieldset`
  border: none;
  padding: 0;
  margin-bottom: 20px;
`;

const StyledLegend = styled.legend`
  font-size: 19px;
  font-weight: bold;
  margin-bottom: 5px;
`;

const FormFieldset = ({ label, children }) => {
  return (
    <StyledFieldset>
      <StyledLegend>{label}</StyledLegend>
      {children}
    </StyledFieldset>
  );
};

export default FormFieldset;
