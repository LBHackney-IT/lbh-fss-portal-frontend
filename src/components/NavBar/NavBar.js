import React, { useState, useContext } from "react";
import styled from "styled-components";
import { breakpoint } from "../../utils/breakpoint/breakpoint";
import UserContext from "../../context/UserContext/UserContext";
// import NavLink from "../NavLink/NavLink";
import NavLinkPrimary from "../NavLinkPrimary/NavLinkPrimary";
import SecondaryNavMenu from "../SecondaryNavMenu/SecondaryNavMenu";
import closeIcon from "./icons/close.svg";
import burgerIcon from "./icons/open-menu.svg";
import { green } from "../../settings";

const StyledPrimaryLink = styled(NavLinkPrimary)`
  text-decoration: none;
  margin: 0;
  text-align: left !important;
  border-radius: 0 0 0 0 !important;
  ${breakpoint("md")`
    margin-left: 10px;
    text-align: center !important;
    border-radius: 3px 3px 0px 0px !important;
  `};
`;

const StyledMobileTitle = styled.div`
  display: flex;
  background-color: ${green[400]};
  padding: 10px 20px;
  color: white;
  font-size: 19px;
  font-weight: 700;
  ${breakpoint("md")`
    display: none;
  `};
  cursor: pointer !important;
`;

const StyledTitleText = styled.div`
  margin-left: 5px;
`;

const StyledNav = styled.nav`
  display: ${(props) => (props.menuIsOpen ? "flex" : "none")};
  flex-direction: column;
  background-color: ${green[400]};
  ${breakpoint("md")`
    padding-top: 10px;
    display: flex;
    flex-direction: row;
  `};
  & > * {
  }
`;

const StyledSecondaryNavMenuContainer = styled.span`
  display: block;
  ${breakpoint("md")`
    display: none;
  `};
`;

const StyledCloseIcon = styled.span`
  display: ${(props) => (props.menuIsOpen ? "inline" : "none")};
  background-repeat: no-repeat;
  display: inline-block;
  text-indent: -999999px;
  background-size: contain;
  width: ${(props) => (props.menuIsOpen ? "25px" : "0")};
  height: ${(props) => (props.menuIsOpen ? "25px" : "0")};
  background-image: url(${closeIcon});
  cursor: pointer;
  margin: -2px 0 0 -6px;
`;

const StyledBurgerIcon = styled.span`
  background-repeat: no-repeat;
  display: inline-block;
  text-indent: -999999px;
  background-size: contain;
  margin-right: ${(props) => (!props.menuIsOpen ? "5px" : "0")};
  width: ${(props) => (!props.menuIsOpen ? "15px" : "0")};
  height: ${(props) => (!props.menuIsOpen ? "15px" : "0")};
  margin-top: 2px;
  background-image: url(${burgerIcon});
  cursor: pointer;
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
        <StyledCloseIcon menuIsOpen={menuIsOpen} />
        <StyledBurgerIcon menuIsOpen={menuIsOpen} />
        <StyledTitleText>Menu</StyledTitleText>
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
