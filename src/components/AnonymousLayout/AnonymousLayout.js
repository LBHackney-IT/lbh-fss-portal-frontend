import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { neutral } from "../../settings/";

const StyledLayout = styled.div`
  background-color: ${(props) => props.backgroundColor};
  padding: 30px 10px;
  min-height: 100vh;
`;

const StyledLayoutInner = styled.div`
  max-width: 429px;
  margin: 0 auto;
  background-color: ${neutral[100]};
  padding: 30px 20px;
  border-radius: 3px;
  box-shadow: 4px 4px 4px rgba(0, 30, 58, 0.15);
`;

const StyledHeading = styled.div`
  padding-bottom: 35px;
  margin-bottom: 30px;
  color: ${neutral[400]};
  font-size: 24px;
  border-bottom: 1px solid ${neutral[300]};
`;

const AnonymousLayout = ({ children, backgroundColor = neutral[200] }) => {
  return (
    <StyledLayout backgroundColor={backgroundColor}>
      <StyledLayoutInner>
        <StyledHeading>Find support services</StyledHeading>
        {children}
      </StyledLayoutInner>
    </StyledLayout>
  );
};

AnonymousLayout.propTypes = {
  children: PropTypes.node,
};

export default AnonymousLayout;
