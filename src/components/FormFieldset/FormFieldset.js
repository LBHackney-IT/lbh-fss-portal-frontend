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

const StyledHelp = styled.p``;

const FormFieldset = ({ label, children, help }) => {
  return (
    <StyledFieldset>
      <StyledLegend>{label}</StyledLegend>
      {help ? <StyledHelp>{help}</StyledHelp> : ""}
      {children}
    </StyledFieldset>
  );
};

export default FormFieldset;
