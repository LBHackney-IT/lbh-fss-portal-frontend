import React, { useState, useRef, useContext } from "react";
import styled from "styled-components";
import OrganisationConfirmLocationForm from "./OrganisationConfirmLocationForm/OrganisationConfirmLocationForm";
import OrganisationCharityInformationForm from "./OrganisationCharityInformationForm/OrganisationCharityInformationForm";
import OrganisationChildSupportForm from "./OrganisationChildSupportForm/OrganisationChildSupportForm";
import OrganisationAdultSupportForm from "./OrganisationAdultSupportForm/OrganisationAdultSupportForm";
import scrollToRef from "../../../utils/scrollToRef/scrollToRef";
import { breakpoint } from "../../../utils/breakpoint/breakpoint";
import {
  checkIsInternalTeam,
  convertStepNumToWord,
  calculateStepPercentage,
} from "../../../utils/functions/functions";
import { grey } from "../../../settings";
import FormNav from "../../../components/FormNav/FormNav";
import OrganisationName from "./OrganisationName/OrganisationName";
import UserContext from "../../../context/UserContext/UserContext";

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

const StyledStepTextContainer = styled.div`
  display: flex;
  justify-content: space-between;
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
  initialStepId = "organisation-name",
  submitLoading = false,
  enableAllLinks = false,
}) => {
  let stepArray = [
    {
      id: "organisation-name",
      label: "Organisation name",
      internalTeamOnly: false,
    },
    {
      id: "confirm-location",
      label: "Where do you provide support?",
      internalTeamOnly: false,
    },
    {
      id: "charity-information",
      label: "Are you a registered charity or receive funding?",
      internalTeamOnly: false,
    },
    {
      id: "child-support",
      label: "Do you provide services for under 16’s?",
      internalTeamOnly: false,
    },
    {
      id: "adult-support",
      label: "Do you provide services for vulnerable adults?",
      internalTeamOnly: false,
    },
  ];

  const [showHiddenFieldSnapshot, setShowHiddenFieldSnapshot] = useState({});

  const [stepNum, setStepNum] = useState(
    stepArray.findIndex((s) => s.id === initialStepId)
  );

  const [draftOrganisation, setDraftOrganisation] = useState(defaultValues);

  const user = useContext(UserContext)[0];

  const isInternalTeam = checkIsInternalTeam(user.roles);

  const mainRef = useRef(null);

  stepArray = stepArray.filter((step) => {
    if (isInternalTeam) {
      return true;
    } else {
      return !step.internalTeamOnly;
    }
  });

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

  const goBackToPreviousStep = (e) => {
    e.preventDefault();
    setStepNum(stepNum - 1);
  };

  const renderStepSwitch = () => {
    switch (stepArray[stepNum].id) {
      case "organisation-name":
        return (
          <OrganisationName
            defaultValues={draftOrganisation}
            onSubmit={moveToNextStep}
            showHiddenField={showHiddenField}
            setShowHiddenField={setShowHiddenField}
            setShowHiddenFieldSnapshot={setShowHiddenFieldSnapshot}
          />
        );
      case "confirm-location":
        return (
          <OrganisationConfirmLocationForm
            defaultValues={draftOrganisation}
            onSubmit={moveToNextStep}
            showHiddenField={showHiddenField}
            setShowHiddenField={setShowHiddenField}
            setShowHiddenFieldSnapshot={setShowHiddenFieldSnapshot}
            goBackToPreviousStep={goBackToPreviousStep}
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
            goBackToPreviousStep={goBackToPreviousStep}
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
            goBackToPreviousStep={goBackToPreviousStep}
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
            goBackToPreviousStep={goBackToPreviousStep}
          />
        );
      default:
        return false;
    }
  };

  return (
    <>
      <StyledStepTextContainer>
        <StyledStepText>Step {convertStepNumToWord(stepNum)}</StyledStepText>
        <StyledStepText>
          Completed {calculateStepPercentage(stepNum, stepArray)}%
        </StyledStepText>
      </StyledStepTextContainer>
      <h1>Tell us about your organisation</h1>
      <StyledOrganisationForm>
        <StyledOrganisationFormAside>
          <FormNav
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
