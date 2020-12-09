import React from "react";
import styled from "styled-components";
import { defaultTheme } from "../../settings";
import hackneyLogo from "./logos/hackney-logo.svg";
import nhsLogo from "./logos/nhs-logo.svg";
import cityOfLondonLogo from "./logos/city-of-london-logo.svg";

const StyledHeader = styled.header``;

const StyledHeaderTop = styled.div`
  padding: 10px 15px;
  background: ${defaultTheme.headerBackgroundColor};
  color: ${defaultTheme.textColorInverted};
  display: flex;
  justify-content: start;
  align-items: center;
  margin-bottom: 15px;
`;

const StyledLogo = styled.span`
  background-repeat: no-repeat;
  display: inline-block;
  margin-right: 22px;
  text-indent: -999999px;
  background-size: contain;
`;

const StyledLines = styled.div`
  width: 100%;
  height: 4px;
  background-color: #0cac3e;
  position: relative;

  &:before {
    content: "";
    left: 0;
    right: 0;
    background-color: #006e50;
    height: 4px;
    margin-bottom: 7px;
    position: absolute;
    top: -7px;
  }

  &:after {
    content: "";
    left: 0;
    right: 0;
    background-color: #85b70a;
    height: 2px;
    margin-top: 7px;
    position: absolute;
    top: 0px;
  }
`;

const Header = () => {
  return (
    <StyledHeader>
      <StyledHeaderTop>
        <StyledLogo
          style={{
            width: "172px",
            height: "33px",
            backgroundImage: `url(${hackneyLogo})`,
          }}
        >
          Hackney
        </StyledLogo>
        <StyledLogo
          style={{
            width: "42.64px",
            height: "58.94px",
            backgroundImage: `url(${cityOfLondonLogo})`,
          }}
        >
          City of London
        </StyledLogo>
        <StyledLogo
          style={{
            width: "68px",
            height: "27.52px",
            backgroundImage: `url(${nhsLogo})`,
          }}
        >
          NHS
        </StyledLogo>
      </StyledHeaderTop>
      <StyledLines />
    </StyledHeader>
  );
};

export default Header;
