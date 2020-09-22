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
            You can <strong>only</strong> be added to the directory if your
            organisation meets our criteria:
          </p>
          <ul>
            <li>Your organisation operates in Hackney or City</li>
            <li>Is a registered charity or receives funding</li>
            <li>Has relevant safeguarding leads in place (if required)</li>
          </ul>
        </div>
        <div>
          <StyledStepHeading>Step Two</StyledStepHeading>
          <div>
            <strong>Tell us what you do</strong>
          </div>
          <p>You can add details such as:</p>
          <ul>
            <li>Your service name</li>
            <li>Descriptions about your services</li>
            <li>Contact details</li>
            <li>Your location</li>
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
