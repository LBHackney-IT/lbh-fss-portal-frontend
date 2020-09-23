import React from "react";
import styled from "styled-components";
import { grey } from "../../../settings";

const StyledDiv = styled.div`
  background-color: ${grey[300]};
  border: 1px solid #bfc1c3;
  padding: 20px;
  margin: 20px 0;
  border-radius: 3px;
`;

const DigitalGuideInfo = () => {
  return (
    <StyledDiv>
      If you would like support to improve or create your online presence,{" "}
      <a
        href="https://hackney.gov.uk/creating-a-digital-presence"
        target="_blank"
        rel="noopener noreferrer"
      >
        please refer to our digital guide
      </a>
      .
    </StyledDiv>
  );
};

export default DigitalGuideInfo;
