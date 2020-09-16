import React, { useState, useRef } from "react";
import styled from "styled-components";
import OrganisationFormNav from "./OrganisationFormNav/OrganisationFormNav";
import OrganisationConfirmLocationForm from "./OrganisationConfirmLocationForm/OrganisationConfirmLocationForm";
import OrganisationCharityInformationForm from "./OrganisationCharityInformationForm/OrganisationCharityInformationForm";
import OrganisationChildSupportForm from "./OrganisationChildSupportForm/OrganisationChildSupportForm";
import OrganisationAdultSupportForm from "./OrganisationAdultSupportForm/OrganisationAdultSupportForm";
import scrollToRef from "../../../utils/scrollToRef/scrollToRef";

const StyledOrganisationForm = styled.div`
  display: flex;
`;

const StyledOrganisationFormAside = styled.div`
  width: 40%;
  margin: 20px;
`;

const StyledOrganisationFormMain = styled.div`
  width: 60%;
  margin: 20px;
`;

const OrganisationForm = ({
  onFormCompletion,
  organisation = {},
  initialStepId = "confirm-location",
  submitLoading = false,
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

  const [stepNum, setStepNum] = useState(
    stepArray.findIndex((s) => s.id === initialStepId)
  );

  const [draftOrganisation, setDraftOrganisation] = useState(organisation);

  const mainRef = useRef(null);

  const moveToNextStep = (formValues) => {
    setDraftOrganisation({ ...draftOrganisation, ...formValues });

    if (stepNum === stepArray.length - 1) {
      onFormCompletion(draftOrganisation);
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
          />
        );
      case "charity-information":
        return (
          <OrganisationCharityInformationForm
            defaultValues={draftOrganisation}
            onSubmit={moveToNextStep}
          />
        );
      case "child-support":
        return (
          <OrganisationChildSupportForm
            defaultValues={draftOrganisation}
            onSubmit={moveToNextStep}
          />
        );
      case "adult-support":
        return (
          <OrganisationAdultSupportForm
            defaultValues={draftOrganisation}
            onSubmit={moveToNextStep}
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
          setStepNum={setStepNum}
          enableAllLinks={true}
        />
      </StyledOrganisationFormAside>
      <StyledOrganisationFormMain ref={mainRef}>
        {renderStepSwitch()}
      </StyledOrganisationFormMain>
    </StyledOrganisationForm>
  );
};

export default OrganisationForm;
