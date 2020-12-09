import React from "react";
import styled from "styled-components";

const StyledFieldset = styled.fieldset`
  border: none;
  padding: 0;
  margin-bottom: ${(props) => props.marginBottom};
`;

const StyledLegend = styled.legend`
  font-size: 19px;
  font-weight: bold;
  margin-bottom: 5px;
`;

const StyledHelp = styled.p``;

const FormFieldset = ({
  label,
  children,
  help,
  marginBottom = "20px",
  legendStyle,
}) => {
  return (
    <StyledFieldset marginBottom={marginBottom}>
      <StyledLegend style={legendStyle}>{label}</StyledLegend>
      {help ? <StyledHelp>{help}</StyledHelp> : ""}
      {children}
    </StyledFieldset>
  );
};

export default FormFieldset;
