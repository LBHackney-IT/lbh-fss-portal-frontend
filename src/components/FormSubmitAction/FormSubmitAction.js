import React from "react";
import styled from "styled-components";
import { blue, hoverBlue } from "../../settings";

const StyledInput = styled.input`
  text-align: left;
  border: none !important;
  backgroundcolor: white;
  color: ${blue[400]};
  background-color: white;
  display: block;
  max-width: 438px;
  width: 100%;
  padding: 0;
  &:hover {
    cursor: pointer;
    color: ${hoverBlue[400]};
  }
`;

const FormSubmitAction = ({ label }) => {
  return <StyledInput type="submit" value={label} />;
};

export default FormSubmitAction;
