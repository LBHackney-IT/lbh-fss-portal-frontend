import React, { useState, useRef, useContext } from "react";
import styled from "styled-components";
import DigitalGuideInfo from "../DigitalGuideInfo/DigitalGuideInfo";
import ServiceDetailsForm from "./ServiceDetailsForm/ServiceDetailsForm";
import ServiceLocationsForm from "./ServiceLocationsForm/ServiceLocationsForm";
import ServiceCategoriesForm from "./ServiceCategoriesForm/ServiceCategoriesForm";
import ServiceDemographicsForm from "./ServiceDemographicsForm/ServiceDemographicsForm";
import ServiceImageForm from "./ServiceImageForm/ServiceImageForm";
import scrollToRef from "../../../utils/scrollToRef/scrollToRef";
import { grey } from "../../../settings";
import FormNav from "../../../components/FormNav/FormNav";
import {
  checkIsInternalTeam,
  convertStepNumToWord,
  calculateStepPercentage,
} from "../../../utils/functions/functions";
import { breakpoint } from "../../../utils/breakpoint/breakpoint";
import RaisedCard from "../../../components/RaisedCard/RaisedCard";
import UserContext from "../../../context/UserContext/UserContext";

const StyledStepTextContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StyledStepText = styled.p`
  color: ${grey[400]};
`;

const StyledServiceFormMain = styled.div`
  width: 90%;
  margin: 20px;
`;

const StyledServiceForm = styled.div`
  display: flex;
  flex-direction: column;
  ${breakpoint("md")`
    flex-direction: row;
    margin-top: 30px;

  `};
`;

const StyledServiceFormAside = styled.div`
  width: 100%;
  ${breakpoint("md")`
      width: 40%;
      margin: 0 20px 20px 0;
  `};
`;

function doHandleHiddenFieldValues(formValues, pageQuestionNames) {
  pageQuestionNames.forEach((questionName) => {
    if (typeof formValues[questionName] === "undefined") {
      formValues[questionName] = null;
    }
  });

  return formValues;
}

const ServiceForm = ({
  pageTitle,
  onFormCompletion,
  defaultValues = {},
  showHiddenField,
  setShowHiddenField,
  initialStepId = "details",
  submitLoading = false,
}) => {
  let stepArray = [
    { id: "details", label: "Your details", internalTeamOnly: false },
    { id: "locations", label: "Your location(s)", internalTeamOnly: false },
    { id: "categories", label: "What you do", internalTeamOnly: false },
    { id: "demographics", label: "Who you work with", internalTeamOnly: false },
    { id: "image", label: "Your image", internalTeamOnly: false },
  ];

  const [showHiddenFieldSnapshot, setShowHiddenFieldSnapshot] = useState(
    defaultValues
  );

  const [stepNum, setStepNum] = useState(
    stepArray.findIndex((s) => s.id === initialStepId)
  );

  const [draftService, setDraftService] = useState(defaultValues);

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

  const handleStepChange = (values) => {
    if (stepNum === stepArray.length - 1) {
      onFormCompletion({
        ...draftService,
        ...values,
      });
    } else {
      setStepNum(stepNum + 1);

      scrollToRef(mainRef);
    }
  };

  const moveToNextStep = (formValues) => {
    setDraftService({
      ...draftService,
      ...formValues,
    });
    handleStepChange(formValues);
  };

  const moveToNextStepWithHiddenFields = (formValues, pageQuestionNames) => {
    const formValuesWithHiddenFields = doHandleHiddenFieldValues(
      formValues,
      pageQuestionNames
    );

    setDraftService({
      ...draftService,
      ...formValuesWithHiddenFields,
    });

    setShowHiddenFieldSnapshot(showHiddenField);

    handleStepChange(formValuesWithHiddenFields);
  };

  const goBackToPreviousStep = (e) => {
    e.preventDefault();
    setStepNum(stepNum - 1);
  };

  const renderStepSwitch = () => {
    switch (stepArray[stepNum].id) {
      case "details":
        return (
          <ServiceDetailsForm
            defaultValues={draftService}
            onSubmit={moveToNextStep}
          />
        );
      case "locations":
        return (
          <ServiceLocationsForm
            defaultValues={draftService}
            onSubmit={moveToNextStep}
            showHiddenField={showHiddenField}
            setShowHiddenField={setShowHiddenField}
            setShowHiddenFieldSnapshot={setShowHiddenFieldSnapshot}
            goBackToPreviousStep={goBackToPreviousStep}
          />
        );
      case "categories":
        return (
          <ServiceCategoriesForm
            defaultValues={draftService}
            onSubmit={moveToNextStepWithHiddenFields}
            showHiddenField={showHiddenField}
            setShowHiddenField={setShowHiddenField}
            setShowHiddenFieldSnapshot={setShowHiddenFieldSnapshot}
            goBackToPreviousStep={goBackToPreviousStep}
          />
        );
      case "demographics":
        return (
          <ServiceDemographicsForm
            defaultValues={draftService}
            onSubmit={moveToNextStep}
            goBackToPreviousStep={goBackToPreviousStep}
          />
        );
      case "image":
        return (
          <ServiceImageForm
            defaultValues={draftService}
            onSubmit={moveToNextStep}
            submitLoading={submitLoading}
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
      <h1>{pageTitle}</h1>
      <StyledServiceForm>
        <StyledServiceFormAside>
          <FormNav
            stepArray={stepArray}
            stepNum={stepNum}
            setStepNum={setStepNum}
            enableAllLinks={false}
            setShowHiddenField={setShowHiddenField}
            showHiddenFieldSnapshot={showHiddenFieldSnapshot}
          />
          <DigitalGuideInfo />
        </StyledServiceFormAside>
        <RaisedCard
          backgroundColor="white"
          widthMedium="60%"
          widthMobile="100%"
          margin="0 0 40px 0"
        >
          <StyledServiceFormMain ref={mainRef}>
            {renderStepSwitch()}
          </StyledServiceFormMain>
        </RaisedCard>
      </StyledServiceForm>
    </>
  );
};

export default ServiceForm;
