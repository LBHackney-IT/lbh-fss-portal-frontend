import React, { useState, useContext } from "react";
import Button from "../Button/Button";
import styled from "styled-components";
import { breakpoint } from "../../utils/breakpoint/breakpoint";
import UserContext from "../../context/UserContext/UserContext";
import NavLink from "../NavLink/NavLink";
import SecondaryNavMenu from "../SecondaryNavMenu/SecondaryNavMenu";
import closeIcon from "./icons/close.svg";

const StyledPrimaryLink = styled(NavLink)`
  margin: 10px 0;
  ${breakpoint("sm")`
    margin-right: 27px;
  `};
`;

const StyledMobileTitle = styled.div`
  display: flex;
  ${breakpoint("sm")`
    display: none;
  `};
`;

const StyledNav = styled.nav`
  display: ${(props) => (props.menuIsOpen ? "flex" : "none")};
  flex-direction: column;
  ${breakpoint("sm")`
    display: flex;
    flex-direction: row;
  `};
  & > * {
  }
`;

const StyledSecondaryNavMenuContainer = styled.span`
  display: block;
  ${breakpoint("sm")`
    display: none;
  `};
`;

const StyledCloseIcon = styled.span`
  display: ${(props) => (props.menuIsOpen ? "inline" : "none")};
  background-repeat: no-repeat;
  display: inline-block;
  margin-right: 5px;
  text-indent: -999999px;
  background-size: contain;
  width: 10px;
  height: 10px;
  margin-top: 4px;
  background-image: url(${closeIcon});
`;

function NavBar() {
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  function toggleMenu() {
    setMenuIsOpen(!menuIsOpen);
  }

  const { roles } = useContext(UserContext)[0];
  const isInternalTeam = roles.includes("viewer") || roles.includes("admin");

  return (
    <>
      <StyledMobileTitle onClick={toggleMenu}>
        <StyledCloseIcon />
        <div>Menu</div>
      </StyledMobileTitle>
      <StyledNav menuIsOpen={menuIsOpen}>
        {!isInternalTeam ? (
          <StyledPrimaryLink to="/organisation">
            Your organisation
          </StyledPrimaryLink>
        ) : null}
        {isInternalTeam ? (
          <StyledPrimaryLink to="/organisations">
            Organisations
          </StyledPrimaryLink>
        ) : null}
        <StyledPrimaryLink to="/services">
          {isInternalTeam ? "Listings" : "Your listings"}
        </StyledPrimaryLink>
        {isInternalTeam ? (
          <StyledPrimaryLink to="/users">Users</StyledPrimaryLink>
        ) : null}
        {isInternalTeam ? (
          <StyledPrimaryLink to="/analytics">Analytics</StyledPrimaryLink>
        ) : null}
        {isInternalTeam ? (
          <StyledPrimaryLink to="/search">Search</StyledPrimaryLink>
        ) : null}
        <StyledSecondaryNavMenuContainer>
          <SecondaryNavMenu />
        </StyledSecondaryNavMenuContainer>
      </StyledNav>
    </>
  );
}
export default NavBar;
