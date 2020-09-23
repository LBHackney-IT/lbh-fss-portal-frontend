import React from "react";
import styled from "styled-components";
import { green, grey } from "../../settings";

const StyledDiv = styled.div`
  border-top: 3px solid ${green[400]} !important;
  padding: ${(props) => props.padding || "20px"};
  border: 2px solid #dee0e2;
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.05);
  border-radius: 3px;
  background-color: ${(props) => props.backgroundColor || grey[300]};
  width: ${(props) => props.width || "100%"};
`;

const RaisedCard = ({ children, backgroundColor, padding, width }) => {
  return (
    <StyledDiv
      backgroundColor={backgroundColor}
      padding={padding}
      width={width}
    >
      {children}
    </StyledDiv>
  );
};

export default RaisedCard;
