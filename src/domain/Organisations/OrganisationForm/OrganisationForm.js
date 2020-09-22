import React, { useState, useRef } from "react";
import styled from "styled-components";
import OrganisationFormNav from "./OrganisationFormNav/OrganisationFormNav";
import OrganisationConfirmLocationForm from "./OrganisationConfirmLocationForm/OrganisationConfirmLocationForm";
import OrganisationCharityInformationForm from "./OrganisationCharityInformationForm/OrganisationCharityInformationForm";
import OrganisationChildSupportForm from "./OrganisationChildSupportForm/OrganisationChildSupportForm";
import OrganisationAdultSupportForm from "./OrganisationAdultSupportForm/OrganisationAdultSupportForm";
import scrollToRef from "../../../utils/scrollToRef/scrollToRef";
import { breakpoint } from "../../../utils/breakpoint/breakpoint";
import { convertStepNumToWord } from "../../../utils/functions/functions";
import { grey } from "../../../settings";

const StyledOrganisationForm = styled.div`
  display: flex;
  flex-direction: column;
  ${breakpoint("md")`
    flex-direction: row;
  `};
`;

const StyledOrganisationFormAside = styled.div`
  width: 100%;
  ${breakpoint("sm")`
    width: 85%;
  `};
  ${breakpoint("md")`
      width: 40%;
      margin: 20px 20px 20px 0;
  `};
`;

const StyledOrganisationFormMain = styled.div`
  width: 90%;
  margin: 20px;
  ${breakpoint("sm")`
    width: 60%;
  `};
`;

const StyledStepText = styled.p`
  color: ${grey[400]};
`;

function doHandleHiddenFieldValues(formValues, pageQuestionNames) {
  pageQuestionNames.forEach((questionName) => {
    if (typeof formValues[questionName] === "undefined") {
      formValues[questionName] = null;
    }
  });

  return formValues;
}

const OrganisationForm = ({
  onFormCompletion,
  defaultValues = {},
  showHiddenField,
  setShowHiddenField,
  initialStepId = "confirm-location",
  submitLoading = false,
  enableAllLinks = false,
}) => {
  const stepArray = [
    {
      id: "confirm-location",
      label: "Where do you provide support?",
    },
    {
      id: "charity-information",
      label: "Are you a registered charity or receive funding?",
    },
    {
      id: "child-support",
      label: "Do you provide services for under 16’s",
    },
    {
      id: "adult-support",
      label: "Do you provide services for vulnerable adults?",
    },
  ];

  const [showHiddenFieldSnapshot, setShowHiddenFieldSnapshot] = useState({});

  const [stepNum, setStepNum] = useState(
    stepArray.findIndex((s) => s.id === initialStepId)
  );

  const [draftOrganisation, setDraftOrganisation] = useState(defaultValues);

  const mainRef = useRef(null);

  const moveToNextStep = (formValues, pageQuestionNames) => {
    const formValuesWithHiddenFields = doHandleHiddenFieldValues(
      formValues,
      pageQuestionNames
    );

    setDraftOrganisation({
      ...draftOrganisation,
      ...formValuesWithHiddenFields,
    });

    setShowHiddenFieldSnapshot(showHiddenField);

    if (stepNum === stepArray.length - 1) {
      onFormCompletion({
        ...draftOrganisation,
        ...formValuesWithHiddenFields,
      });
    } else {
      setStepNum(stepNum + 1);

      scrollToRef(mainRef);
    }
  };

  const renderStepSwitch = () => {
    switch (stepArray[stepNum].id) {
      case "confirm-location":
        return (
          <OrganisationConfirmLocationForm
            defaultValues={draftOrganisation}
            onSubmit={moveToNextStep}
            showHiddenField={showHiddenField}
            setShowHiddenField={setShowHiddenField}
            setShowHiddenFieldSnapshot={setShowHiddenFieldSnapshot}
          />
        );
      case "charity-information":
        return (
          <OrganisationCharityInformationForm
            defaultValues={draftOrganisation}
            onSubmit={moveToNextStep}
            showHiddenField={showHiddenField}
            setShowHiddenField={setShowHiddenField}
            setShowHiddenFieldSnapshot={setShowHiddenFieldSnapshot}
          />
        );
      case "child-support":
        return (
          <OrganisationChildSupportForm
            defaultValues={draftOrganisation}
            onSubmit={moveToNextStep}
            showHiddenField={showHiddenField}
            setShowHiddenField={setShowHiddenField}
            setShowHiddenFieldSnapshot={setShowHiddenFieldSnapshot}
          />
        );
      case "adult-support":
        return (
          <OrganisationAdultSupportForm
            defaultValues={draftOrganisation}
            onSubmit={moveToNextStep}
            submitLoading={submitLoading}
            showHiddenField={showHiddenField}
            setShowHiddenField={setShowHiddenField}
            setShowHiddenFieldSnapshot={setShowHiddenFieldSnapshot}
          />
        );
      default:
        return false;
    }
  };

  return (
    <>
      <StyledStepText>Step {convertStepNumToWord(stepNum)}</StyledStepText>
      <h1>Tell us about your organisation</h1>
      <StyledOrganisationForm>
        <StyledOrganisationFormAside>
          <OrganisationFormNav
            stepArray={stepArray}
            stepNum={stepNum}
            setStepNum={setStepNum}
            enableAllLinks={enableAllLinks}
            setShowHiddenField={setShowHiddenField}
            showHiddenFieldSnapshot={showHiddenFieldSnapshot}
          />
        </StyledOrganisationFormAside>
        <StyledOrganisationFormMain ref={mainRef}>
          {renderStepSwitch()}
        </StyledOrganisationFormMain>
      </StyledOrganisationForm>
    </>
  );
};

export default OrganisationForm;
