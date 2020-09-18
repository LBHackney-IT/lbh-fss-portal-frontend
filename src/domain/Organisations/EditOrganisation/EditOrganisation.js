import React, { useState, useEffect } from "react";
import OrganisationForm from "../OrganisationForm/OrganisationForm";
import useOrganisationFetch from "../../../hooks/useOrganisationFetch/useOrganisationFetch";
import OrganisationService from "../../../services/OrganisationService/OrganisationService";
import { navigate } from "@reach/router";
import { toast } from "react-toastify";

const EditOrganisation = (props) => {
  const [submitIsLoading, setSubmitIsLoading] = useState(false);
  const [defaultValues, setDefaultValues] = useState({});

  const {
    organisation,
    isLoading: organisationFetchIsLoading,
  } = useOrganisationFetch(props.organisationId);

  function convertBooleanToYesNo(value) {
    return value ? "yes" : "no";
  }

  function convertYesNoToBoolean(value) {
    return value.toLowerCase() === "yes" ? true : false;
  }

  const allFields = [
    "isHackneyBased",
    "isRegisteredCharity",
    "charityNumber",
    "hasHcOrColGrant",
    "hasHcvsOrHgOrAelGrant",
    "isTraRegistered",
    "rslOrHaAssociation",
    "isLotteryFunded",
    "lotteryFundedProject",
    "fundingOther",
    "hasChildSupport",
    "hasChildSafeguardingLead",
    "childSafeguardingLeadFirstName",
    "childSafeguardingLeadLastName",
    "childSafeguardingLeadTrainingMonth",
    "childSafeguardingLeadTrainingYear",
    "hasAdultSupport",
    "hasAdultSafeguardingLead",
    "adultSafeguardingLeadFirstName",
    "adultSafeguardingLeadLastName",
    "adultSafeguardingLeadTrainingMonth",
    "adultSafeguardingLeadTrainingYear",
    "hasEnhancedSupport",
    "isLocalOfferListed",
    "localOfferLink",
  ];

  const yesNoRadioFields = [
    "isHackneyBased",
    "hasChildSupport",
    "hasChildSafeguardingLead",
    "hasAdultSupport",
    "hasAdultSafeguardingLead",
  ];

  const hiddenFields = [
    "hasChildSafeguardingLead",
    "childSafeguardingLeadFirstName",
    "childSafeguardingLeadLastName",
    "childSafeguardingLeadTrainingMonth",
    "childSafeguardingLeadTrainingYear",
  ];

  function doCleanDefaultValues(values) {
    yesNoRadioFields.forEach((field) => {
      if (field in values) {
        values[field] = convertBooleanToYesNo(values[field]);
      }
    });

    return values;
  }

  function doCleanFormValues(values) {
    allFields.forEach((field) => {
      if (!(field in values)) {
        values[field] = null;
      }
    });

    yesNoRadioFields.forEach((field) => {
      if (field in values) {
        values[field] = convertYesNoToBoolean(values[field]);
      }
    });

    return values;
  }

  useEffect(() => {
    if (organisationFetchIsLoading) return;

    const cleanedDefaultValues = doCleanDefaultValues(organisation);

    setDefaultValues(cleanedDefaultValues);
  }, [organisation, organisationFetchIsLoading, setDefaultValues]);

  // TODO: will need to create a hiddenfield context and pass down, so that i can set whether hidden fields are to show or not!
  // TODO: convert training month to drop down, rather than digit

  async function doEditOrganisation(formValues) {
    if (submitIsLoading) return;

    setSubmitIsLoading(true);

    const cleanedFormValues = doCleanFormValues(formValues);

    Object.keys(organisation).forEach(function (key) {
      if (typeof cleanedFormValues[key] !== "undefined") {
        organisation[key] = cleanedFormValues[key];
      }
    });

    const updatedOrganisation = await OrganisationService.updateOrganisation(
      props.organisationId,
      organisation
    );

    setSubmitIsLoading(false);

    if (updatedOrganisation) {
      toast.success(`Organisation ${updatedOrganisation.name} updated.`);

      navigate("/services");
    } else {
      toast.error("Unable to update organisation.");
    }
  }

  if (organisationFetchIsLoading || Object.keys(defaultValues).length === 0) {
    return "Loading";
  }

  return (
    <>
      <OrganisationForm
        onFormCompletion={doEditOrganisation}
        defaultValues={defaultValues}
        submitLoading={submitIsLoading}
        enableAllLinks={true}
      />
    </>
  );
};

export default EditOrganisation;
