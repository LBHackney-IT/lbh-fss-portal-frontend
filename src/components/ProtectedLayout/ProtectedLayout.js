import React, { useContext } from "react";
import NavLink from "../NavLink/NavLink";
import PropTypes from "prop-types";
import UserContext from "../../context/UserContext/UserContext";
import styled from "styled-components";
import { neutral } from "../../settings";

const StyledLayout = styled.div`
  padding: 30px 10px;
  max-width: 980px;
  margin: 0 auto;
`;

const StyledLayoutTop = styled.div`
  padding-bottom: 30px;
  margin-bottom: 25px;
  display: flex;
  justify-content: space-between;
`;

const StyledOrgLabel = styled.div`
  font-size: 19px;
  margin-bottom: 10px;
  color: ${neutral[400]};
`;

const StyledOrgName = styled.div`
  font-size: 36px;
  font-weight: bold;
  max-width: 484px;
`;

const StyledContactInfo = styled.div`
  border-top: 1px solid ${neutral[300]};
  padding: 21px 0 49px 0;
`;

const StyledPrimaryLink = styled(NavLink)`
  margin-right: 27px;
`;

const StyledSecondaryLink = styled(NavLink)`
  margin-left: 27px;
`;

const ProtectedLayout = ({ children }) => {
  const { roles, organisation } = useContext(UserContext)[0];

  const isInternalTeam = roles.includes("viewer") || roles.includes("admin");

  return (
    <StyledLayout>
      <StyledLayoutTop>
        <div>
          <StyledOrgLabel>Your organisation</StyledOrgLabel>
          <StyledOrgName>{organisation.name}</StyledOrgName>
        </div>
        <nav>
          {isInternalTeam ? (
            <a
              href="https://hackney.gov.uk/find-support-services/"
              target="_blank"
              rel="noopener noreferrer"
            >
              View site
            </a>
          ) : null}
          <StyledSecondaryLink to="/account">My account</StyledSecondaryLink>
          <StyledSecondaryLink to="/logout">Log out</StyledSecondaryLink>
        </nav>
      </StyledLayoutTop>
      <nav>
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
      </nav>
      {children}
      <StyledContactInfo>
        If you need support please email:{" "}
        <a href="mailto:team@hackneymap.gov.uk">team@hackneymap.gov.uk</a>
      </StyledContactInfo>
    </StyledLayout>
  );
};

ProtectedLayout.propTypes = {
  children: PropTypes.node,
};

export default ProtectedLayout;
