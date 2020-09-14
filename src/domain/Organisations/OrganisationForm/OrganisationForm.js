import React, { useState, useRef } from "react";
import styled from "styled-components";
import OrganisationFormNav from "./OrganisationFormNav/OrganisationFormNav";
import OrganisationConfirmLocationForm from "./OrganisationConfirmLocationForm/OrganisationConfirmLocationForm";
import OrganisationCharityInformationForm from "./OrganisationCharityInformationForm/OrganisationCharityInformationForm";
import OrganisationChildSupportForm from "./OrganisationChildSupportForm/OrganisationChildSupportForm";
import OrganisationAdultSupportForm from "./OrganisationAdultSupportForm/OrganisationAdultSupportForm";
//import scrollToRef from "../../../utils/scrollToRef/scrollToRef";

const StyledOrganisationForm = styled.div`
  display: flex;
`;

const StyledOrganisationFormAside = styled.div``;

const StyledOrganisationFormMain = styled.div``;

const OrganisationForm = ({
  onFormCompletion,
  organisation = {},
  stepId = "details",
  submitLoading = false,
}) => {
  const stepArray = [
    { id: "confirm-location", label: "Where do you provide support?" },
    {
      id: "charity-information",
      label: "Are you a registered charity or receive funding?",
    },
    { id: "child-support", label: "Do you provide services for under 16’s" },
    {
      id: "adult-support",
      label: "Do you provide services for vulnerable adults?",
    },
  ];

  let stepNum = Math.max(
    stepArray.findIndex((s) => s.id === stepId),
    0
  );

  const [draftOrganisation, setDraftOrganisation] = useState(organisation);

  const mainRef = useRef(null);

  /*const moveToNextStep = (formValues) => {
    setDraftService({ ...draftService, ...formValues });

    if (stepNum === stepArray.length - 1) {
      onFormCompletion(draftService);
    } else {
      setStepNum(stepNum + 1);

      scrollToRef(mainRef);
    }
  };*/

  const onSubmit = () => {};

  const renderStepSwitch = () => {
    switch (stepArray[stepNum].id) {
      case "confirm-location":
        return (
          <OrganisationConfirmLocationForm
            defaultValues={draftOrganisation}
            onSubmit={onSubmit}
          />
        );
      case "charity-information":
        return (
          <OrganisationCharityInformationForm
            defaultValues={draftOrganisation}
            onSubmit={onSubmit}
          />
        );
      case "child-support":
        return (
          <OrganisationChildSupportForm
            defaultValues={draftOrganisation}
            onSubmit={onSubmit}
          />
        );
      case "adult-support":
        return (
          <OrganisationAdultSupportForm
            defaultValues={draftOrganisation}
            onSubmit={onSubmit}
            submitLoading={submitLoading}
          />
        );
      default:
        return false;
    }
  };

  return (
    <StyledOrganisationForm>
      <StyledOrganisationFormAside>
        <OrganisationFormNav
          stepArray={stepArray}
          stepNum={stepNum}
          formRef={mainRef}
        />
      </StyledOrganisationFormAside>
      <StyledOrganisationFormMain ref={mainRef}>
        {renderStepSwitch()}
      </StyledOrganisationFormMain>
    </StyledOrganisationForm>
  );
};

export default OrganisationForm;
