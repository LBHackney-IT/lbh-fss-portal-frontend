import React, { useState, useContext } from "react";
import Button from "../Button/Button";
import styled from "styled-components";
import { breakpoint } from "../../utils/breakpoint/breakpoint";
import UserContext from "../../context/UserContext/UserContext";
import NavLink from "../NavLink/NavLink";
import { green } from "../../settings";

const StyledSecondaryLink = styled(NavLink)`
  margin: 10px 0 0 10px;
  text-decoration: none;
  color: white;
  ${breakpoint("sm")`
    color: #025EA6;
   margin-left: 27px;
  `};
`;

const StyledAnchor = styled.a`
  margin: 10px 0 0 10px;
  color: white;
  text-decoration: none;
  ${breakpoint("sm")`
   color: #025EA6;
   margin-left: 27px;
  `};
`;

const StyledNav = styled.nav`
  display: flex;
  flex-direction: column;
  background-color: ${green[400]};
  padding: 0 0 10px 10px;
  ${breakpoint("sm")`
    flex-direction: row;
    background-color: transparent;
  `};
`;

function SecondaryNavMenu() {
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  function toggleMenu() {
    setMenuIsOpen(!menuIsOpen);
  }

  const { roles } = useContext(UserContext)[0];
  const isInternalTeam = roles.includes("viewer") || roles.includes("admin");

  return (
    <StyledNav>
      {isInternalTeam ? (
        <StyledAnchor
          href="https://hackney.gov.uk/find-support-services/"
          target="_blank"
          rel="noopener noreferrer"
        >
          View site
        </StyledAnchor>
      ) : null}
      <StyledSecondaryLink to="/account">My account</StyledSecondaryLink>
      <StyledSecondaryLink to="/logout">Log out</StyledSecondaryLink>
    </StyledNav>
  );
}
export default SecondaryNavMenu;
