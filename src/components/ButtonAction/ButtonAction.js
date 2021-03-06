import React from "react";
import styled from "styled-components";
import { blue } from "../../settings";

const StyledButton = styled.button`
  text-align: left;
  border: none !important;
  backgroundcolor: white;
  color: ${blue[400]};
  background-color: white;
  display: block;
  max-width: 438px;
  padding: 0;
  &:hover {
    cursor: pointer;
    color: ${blue[500]};
  }
`;

const ButtonAction = ({ onClick, label }) => {
  return <StyledButton onClick={onClick}>{label}</StyledButton>;
};

export default ButtonAction;
