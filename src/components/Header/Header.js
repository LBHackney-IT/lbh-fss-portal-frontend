import React from "react";
import styled from "styled-components";
import { defaultTheme } from "../../settings";

const StyledHeader = styled.header`
  background: ${defaultTheme.headerBackgroundColor};
  color: ${defaultTheme.textColorInverted};
`;

const Header = () => {
  return (
    <StyledHeader>
      <div>Voluntary and Community Organisations Support</div>
      <div>
        <span>Hackney</span>
        <span>NHS</span>
        <span>City of London</span>
      </div>
    </StyledHeader>
  );
};

export default Header;
