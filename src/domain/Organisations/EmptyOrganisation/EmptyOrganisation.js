import React from "react";
import { navigate } from "@reach/router";
import Button from "../../../components/Button/Button";
import styled from "styled-components";
import { grey, neutral } from "../../../settings";
import AnonymousLayout from "../../../components/AnonymousLayout/AnonymousLayout";

const StyledHeader = styled.div`
  padding-bottom: 20px;
  margin-bottom: 30px;
  color: ${neutral[400]};
  font-size: 19px;
  font-weight: bold;
  border-bottom: 1px solid ${neutral[300]};
`;

const StyledMainHeading = styled.p`
  font-size: 24px;
`;
const StyledStepHeading = styled.p`
  color: ${grey[700]};
  margin-top: 30px;
`;

const EmptyOrganisation = () => {
  function redirectToAddOrganisation() {
    navigate("/organisations/add");
  }
  return (
    <div style={{ marginTop: "20px" }}>
      <AnonymousLayout backgroundColor={"transparent"} maxWidth={"600px"}>
        <StyledMainHeading>
          Complete the following steps to submit your organisation for
          inclusion.
        </StyledMainHeading>
        <div>
          <StyledStepHeading>Step One</StyledStepHeading>
          <div>
            <strong>Tell us about your organisation</strong>
          </div>
          <p>
            You may only be added to Find support services if your organisation
            meets our criteria:
          </p>
          <ul>
            <li>Operates in Hackney or City of London</li>
            <li>
              Is a registered charity, receives funding from a known source or
              is registered with a Tenants’ and Residents’ Association
            </li>
            <li>Has relevant safeguarding leads in place (if required)</li>
          </ul>
        </div>
        <div>
          <StyledStepHeading>Step Two</StyledStepHeading>
          <div>
            <strong>Tell us what you do</strong>
          </div>
          <p>You can add details including:</p>
          <ul>
            <li>Organisation name</li>
            <li>Description of your services and activities</li>
            <li>Who your service is for</li>
            <li>Contact details and location(s)</li>
          </ul>
        </div>
        <Button
          label="Get started ›"
          onClick={redirectToAddOrganisation}
          margin={"30px 0 20px 0"}
        />
      </AnonymousLayout>
    </div>
  );
};

export default EmptyOrganisation;
