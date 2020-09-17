import { meetsContrastGuidelines } from "polished";
import React from "react";
import styled from "styled-components";

const StyledError = styled.span`
  color: red;
  display: block;
  margin-top: ${(props) => props.marginTop};
  margin-bottom: ${(props) => props.marginBottom};
`;

const FormError = ({ error, marginBottom = "20px", marginTop = "0" }) => {
  return (
    <StyledError role="alert" marginBottom={marginBottom} marginTop={marginTop}>
      {error}
    </StyledError>
  );
};

export default FormError;
