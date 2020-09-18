import React from "react";
import styled from "styled-components";
import Button from "../../../components/Button/Button";
import { navigate } from "@reach/router";

const StyledButton = styled(Button)`
  width: 100%;
  margin: 25px 0 0 0;
`;

const TermsAndConditions = () => {
  function onClick() {
    navigate("/register/step-1");
  }

  return (
    <>
      <h1>Terms and Conditions</h1>
      <p>
        Please get in touch if you wish to discuss via{" "}
        <a href="mailto:fss@hackney.gov.uk">fss@hackney.gov.uk</a>
      </p>
      <p>
        The details you provide will be used for signposting only, we will not
        endorse any of the listed services or activities.
      </p>
      <p>
        Further details on how Hackney Council will process your data are
        available at{" "}
        <a href="https://hackney.gov.uk/privacy">
          https://hackney.gov.uk/privacy
        </a>
        .
      </p>
      <p>
        By submitting this form, you are agreeing to Hackney Council
        communicating with you regarding the status and accuracy of your
        listing. If you wish your listing to be removed, please email us at{" "}
        <a href="mailto:fss@hackney.gov.uk">fss@hackney.gov.uk</a>
      </p>
      <StyledButton onClick={onClick} label={"Back"} />
    </>
  );
};

export default TermsAndConditions;
