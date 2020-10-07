import React from "react";
import styled from "styled-components";
import { green, grey } from "../../settings";
import { breakpoint } from "../../utils/breakpoint/breakpoint";

const StyledDiv = styled.div`
  border-top: 3px solid ${green[400]} !important;
  border: 2px solid #dee0e2;
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.05);
  border-radius: 3px;
  background-color: ${(props) => props.backgroundColor || grey[300]};
  margin: ${(props) => props.margin || "0"};
  padding: ${(props) => props.padding || "20px"};
  width: ${(props) => props.widthMobile || "100%"};
  ${breakpoint("md")`
   width: ${(props) => props.widthMedium || "100%"};
`};
`;

const RaisedCard = ({
  children,
  backgroundColor,
  padding,
  widthMobile,
  widthMedium,
  margin,
}) => {
  return (
    <StyledDiv
      backgroundColor={backgroundColor}
      padding={padding}
      widthMobile={widthMobile}
      widthMedium={widthMedium}
      margin={margin}
    >
      {children}
    </StyledDiv>
  );
};

export default RaisedCard;
