import React, { useState, useContext } from "react";
import Button from "../Button/Button";
import styled from "styled-components";
import { breakpoint } from "../../utils/breakpoint/breakpoint";
import UserContext from "../../context/UserContext/UserContext";
import NavLinkSecondary from "../NavLinkSecondary/NavLinkSecondary";
import { green, blue } from "../../settings";
import { checkIsInternalTeam } from "../../utils/functions/functions";

const StyledSecondaryLink = styled(NavLinkSecondary)`
  margin: 10px 0;
  text-decoration: none;
  color: white;
  &:hover {
    color: white;
  }
  ${breakpoint("md")`
    color: #025EA6;
    margin-left: 27px;
    &:hover {
      color: ${blue[500]};
    }
  `};
`;

const StyledAnchor = styled.a`
  margin: 10px 0;
  color: white;
  text-decoration: none;
  &:hover {
    color: white;
  }
  ${breakpoint("md")`
   color: #025EA6;
   margin-left: 27px;
   &:hover {
     color: ${blue[500]};
   }
  `};
`;

const StyledNav = styled.nav`
  display: flex;
  flex-direction: column;
  background-color: ${green[300]};
  padding: 0 0 10px 10px;
  ${breakpoint("md")`
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

  const isInternalTeam = checkIsInternalTeam(roles);

  return (
    <StyledNav>
      {isInternalTeam ? (
        <StyledAnchor
          href="https://hackney.gov.uk/find-support-services/"
          target="_blank"
          rel="noopener noreferrer"
          data-testid="navigation"
        >
          View site
        </StyledAnchor>
      ) : null}
      <StyledSecondaryLink to="/account">My account</StyledSecondaryLink>
      <StyledSecondaryLink to="/logout">
        <div data-testid="logout">Log out</div>
      </StyledSecondaryLink>
    </StyledNav>
  );
}
export default SecondaryNavMenu;
