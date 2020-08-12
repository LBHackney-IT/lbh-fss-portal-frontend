import React from "react";
import styled from "styled-components";
import { defaultTheme } from "../../settings";
import hackneyLogo from "./logos/hackney-logo.svg";
import nhsLogo from "./logos/nhs-logo.svg";
import cityOfLondonLogo from "./logos/city-of-london-logo.svg";

const StyledHeader = styled.header`
  padding: 20px;
  background: ${defaultTheme.headerBackgroundColor};
  color: ${defaultTheme.textColorInverted};
  display: flex;
  justify-content: end;
  align-items: center;
`;

const StyledHeading = styled.div`
  font-size: 19px;
  font-weight: bold;
  margin-right: auto;
`;

const StyledLogo = styled.span`
  background-repeat: no-repeat;
  display: inline-block;
  margin-left: 22px;
  text-indent: -999999px;
  background-size: contain;
`;

const Header = () => {
  return (
    <StyledHeader>
      <StyledHeading>
        Voluntary and Community Organisations Support
      </StyledHeading>
      <StyledLogo
        style={{
          width: "112.38px",
          height: "21.61px",
          backgroundImage: `url(${hackneyLogo})`,
        }}
      >
        Hackney
      </StyledLogo>
      <StyledLogo
        style={{
          width: "47.55px",
          height: "19.88px",
          backgroundImage: `url(${nhsLogo})`,
        }}
      >
        NHS
      </StyledLogo>
      <StyledLogo
        style={{
          width: "29.39px",
          height: "40.63px",
          backgroundImage: `url(${cityOfLondonLogo})`,
        }}
      >
        City of London
      </StyledLogo>
    </StyledHeader>
  );
};

export default Header;
