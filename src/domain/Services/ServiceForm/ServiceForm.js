import React, { useState, useRef } from "react";
import styled from "styled-components";
import ServiceFormNav from "./ServiceFormNav/ServiceFormNav";
import DigitalGuideInfo from "../DigitalGuideInfo/DigitalGuideInfo";
import ServiceDetailsForm from "./ServiceDetailsForm/ServiceDetailsForm";
import ServiceLocationsForm from "./ServiceLocationsForm/ServiceLocationsForm";
import ServiceCategoriesForm from "./ServiceCategoriesForm/ServiceCategoriesForm";
import ServiceDemographicsForm from "./ServiceDemographicsForm/ServiceDemographicsForm";
import ServiceImageForm from "./ServiceImageForm/ServiceImageForm";
import scrollToRef from "../../../utils/scrollToRef/scrollToRef";
const isEmpty = require("lodash/isEmpty");

const StyledServiceForm = styled.div`
  display: flex;
`;

const StyledServiceFormAside = styled.div``;

const StyledServiceFormMain = styled.div``;

const ServiceForm = ({
  onFormCompletion,
  initialStepId = "details",
  submitLoading = false,
}) => {
  const stepArray = [
    { id: "details", label: "Your service details" },
    { id: "locations", label: "Service location(s)" },
    { id: "categories", label: "Services you provide" },
    { id: "demographics", label: "Who you work with" },
    { id: "image", label: "Service picture" },
  ];

  const [stepNum, setStepNum] = useState(
    stepArray.findIndex((s) => s.id === initialStepId)
  );

  const [draftService, setDraftService] = useState({});
  const [validationPass, setValidationPass] = useState(false);

  const mainRef = useRef(null);
  const formRef = useRef(null);

  const moveToNextStep = (formValues) => {
    console.log("BAM");
    setValidationPass(true);
    setDraftService({ ...draftService, ...formValues });

    if (stepNum === stepArray.length - 1) {
      onFormCompletion(draftService);
    } else {
      setStepNum(stepNum + 1);

      scrollToRef(mainRef);
    }
  };

  console.log("validationPass");
  console.log(validationPass);

  const renderStepSwitch = () => {
    switch (stepArray[stepNum].id) {
      case "details":
        return (
          <ServiceDetailsForm
            defaultValues={draftService}
            onSubmit={moveToNextStep}
            formRef={formRef}
            setValidationPass={setValidationPass}
          />
        );
      case "locations":
        return (
          <ServiceLocationsForm
            defaultValues={draftService}
            onSubmit={moveToNextStep}
            formRef={formRef}
            setValidationPass={setValidationPass}
          />
        );
      case "categories":
        return (
          <ServiceCategoriesForm
            defaultValues={draftService}
            onSubmit={moveToNextStep}
            formRef={formRef}
            setValidationPass={setValidationPass}
          />
        );
      case "demographics":
        return (
          <ServiceDemographicsForm
            defaultValues={draftService}
            onSubmit={moveToNextStep}
            formRef={formRef}
            setValidationPass={setValidationPass}
          />
        );
      case "image":
        return (
          <ServiceImageForm
            defaultValues={draftService}
            onSubmit={() => moveToNextStep()}
            submitLoading={submitLoading}
            setValidationPass={setValidationPass}
          />
        );
      default:
        return false;
    }
  };

  return (
    <StyledServiceForm>
      <StyledServiceFormAside>
        <ServiceFormNav
          stepArray={stepArray}
          stepNum={stepNum}
          setStepNum={setStepNum}
          formRef={formRef}
          setValidationPass={setValidationPass}
          validationPass={validationPass}
          enableAllLinks={true}
        />
        <DigitalGuideInfo />
      </StyledServiceFormAside>
      <StyledServiceFormMain ref={mainRef}>
        {renderStepSwitch()}
      </StyledServiceFormMain>
    </StyledServiceForm>
  );
};

export default ServiceForm;
