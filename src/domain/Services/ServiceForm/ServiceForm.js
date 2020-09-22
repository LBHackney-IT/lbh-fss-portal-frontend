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

const StyledServiceForm = styled.div`
  display: flex;
`;

const StyledServiceFormAside = styled.div``;

const StyledServiceFormMain = styled.div``;

const ServiceForm = ({
  onFormCompletion,
  service = {},
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

  const [draftService, setDraftService] = useState(service);

  const mainRef = useRef(null);

  const moveToNextStep = (formValues) => {
    setDraftService({ ...draftService, ...formValues });

    if (stepNum === stepArray.length - 1) {
      onFormCompletion(draftService);
    } else {
      setStepNum(stepNum + 1);

      scrollToRef(mainRef);
    }
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
          />
        );
      case "categories":
        return (
          <ServiceCategoriesForm
            defaultValues={draftService}
            onSubmit={moveToNextStep}
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
            onSubmit={() => moveToNextStep()}
            submitLoading={submitLoading}
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
