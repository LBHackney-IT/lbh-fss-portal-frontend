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
import { checkIsInternalTeam } from "../../utils/functions/functions";

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

const StyledNavOuter = styled.nav`
  background-color: ${green[400]};
`;

const StyledNavInner = styled.div`
  max-width: 980px;
  margin: 0 auto;
  width: 100%;
  display: ${(props) => (props.menuIsOpen ? "flex" : "none")};
  flex-direction: column;
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

  const user = useContext(UserContext)[0];

  const isInternalTeam = checkIsInternalTeam(user.roles);

  return (
    <>
      <StyledMobileTitle onClick={toggleMenu}>
        <StyledCloseIcon menuIsOpen={menuIsOpen} />
        <StyledBurgerIcon menuIsOpen={menuIsOpen} />
        <StyledTitleText>Menu</StyledTitleText>
      </StyledMobileTitle>
      <StyledNavOuter>
        <StyledNavInner menuIsOpen={menuIsOpen}>
          {isInternalTeam ? (
            <StyledPrimaryLink to="/organisations">
              Organisations
            </StyledPrimaryLink>
          ) : (
            <StyledPrimaryLink to="/organisation">
              Your organisation
            </StyledPrimaryLink>
          )}

          {isInternalTeam ? (
            <StyledPrimaryLink to="/services">Listings</StyledPrimaryLink>
          ) : null}

          {!isInternalTeam && user.organisation ? (
            <StyledPrimaryLink to="/service">Your listings</StyledPrimaryLink>
          ) : null}

          {isInternalTeam ? (
            <>
              <StyledPrimaryLink to="/users">Users</StyledPrimaryLink>
            </>
          ) : null}
          {!isInternalTeam && user.organisation ? (
            <StyledPrimaryLink to="/analytics">Analytics</StyledPrimaryLink>
          ) : null}

          <StyledSecondaryNavMenuContainer>
            <SecondaryNavMenu />
          </StyledSecondaryNavMenuContainer>
        </StyledNavInner>
      </StyledNavOuter>
    </>
  );
}
export default NavBar;
