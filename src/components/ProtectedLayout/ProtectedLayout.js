import React, { useContext } from "react";
import PropTypes from "prop-types";
import UserContext from "../../context/UserContext/UserContext";
import styled from "styled-components";
import { neutral } from "../../settings";
import NavBar from "../NavBar/NavBar";
import SecondaryNavMenu from "../SecondaryNavMenu/SecondaryNavMenu";
import { breakpoint } from "../../utils/breakpoint/breakpoint";

const StyledLayout = styled.div`
  padding: 0 10px 30px 10px;
  max-width: 980px;
  margin: 0 auto;
`;

const StyledLayoutTop = styled.div`
  padding: 30px 10px;
  max-width: 980px;
  margin: 0 auto;
  padding-bottom: 30px;
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

const StyledSecondaryNav = styled.nav`
  display: none;
  ${breakpoint("md")`
    display: block;
  `};
`;

const ProtectedLayout = ({ children }) => {
  const { roles, organisation } = useContext(UserContext)[0];

  const isInternalTeam = roles.includes("viewer") || roles.includes("admin");

  return (
    <>
      <StyledLayoutTop>
        <div>
          {organisation ? (
            <>
              <StyledOrgLabel>Your organisation</StyledOrgLabel>
              <StyledOrgName>{organisation.name}</StyledOrgName>
            </>
          ) : null}
        </div>
        <StyledSecondaryNav>
          <SecondaryNavMenu />
        </StyledSecondaryNav>
      </StyledLayoutTop>
      <NavBar />
      <StyledLayout>
        {children}
        <StyledContactInfo>
          If you need support please email:{" "}
          <a href="mailto:fss@hackney.gov.uk">fss@hackney.gov.uk</a>
        </StyledContactInfo>
      </StyledLayout>
    </>
  );
};

ProtectedLayout.propTypes = {
  children: PropTypes.node,
};

export default ProtectedLayout;
