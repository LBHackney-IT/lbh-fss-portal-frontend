import React from "react";
import styled from "styled-components";
import { green } from "../../settings";

const StyledDiv = styled.div`
  border-top: 3px solid ${green[400]} !important;
  padding: 20px;
  border: 2px solid #dee0e2;
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.05);
  border-radius: 3px;
`;

const RaisedCard = ({ children }) => {
  return <StyledDiv>{children}</StyledDiv>;
};

export default RaisedCard;
