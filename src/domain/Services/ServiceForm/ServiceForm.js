import React, { useState, useRef } from "react";
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
import { convertStepNumToWord } from "../../../utils/functions/functions";
import { breakpoint } from "../../../utils/breakpoint/breakpoint";
import RaisedCard from "../../../components/RaisedCard/RaisedCard";

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
  onFormCompletion,
  defaultValues = {},
  showHiddenField,
  setShowHiddenField,
  initialStepId = "details",
  submitLoading = false,
}) => {
  const stepArray = [
    { id: "details", label: "Your details" },
    { id: "locations", label: "Your location(s)" },
    { id: "categories", label: "What you do" },
    { id: "demographics", label: "Who you work with" },
    { id: "image", label: "Your image" },
  ];

  const [showHiddenFieldSnapshot, setShowHiddenFieldSnapshot] = useState(
    defaultValues
  );

  const [stepNum, setStepNum] = useState(
    stepArray.findIndex((s) => s.id === initialStepId)
  );

  const [draftService, setDraftService] = useState(defaultValues);

  const mainRef = useRef(null);

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
          />
        );
      case "demographics":
        return (
          <ServiceDemographicsForm
            defaultValues={draftService}
            onSubmit={moveToNextStep}
          />
        );
      case "image":
        return (
          <ServiceImageForm
            defaultValues={draftService}
            onSubmit={moveToNextStep}
            submitLoading={submitLoading}
          />
        );
      default:
        return false;
    }
  };

  return (
    <>
      <StyledStepText>Step {convertStepNumToWord(stepNum)}</StyledStepText>
      <h1>Create your service listing</h1>
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
