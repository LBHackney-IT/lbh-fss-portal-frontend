import React, { useContext, useState } from "react";
import OrganisationForm from "../OrganisationForm/OrganisationForm";
import OrganisationService from "../../../services/OrganisationService/OrganisationService";
import { navigate } from "@reach/router";
import { toast } from "react-toastify";
import useOrganisationFetch from "../../../hooks/useOrganisationFetch/useOrganisationFetch";
import UserContext from "../../../context/UserContext/UserContext";

const AddOrganisation = () => {
  const [submitIsLoading, setSubmitIsLoading] = useState(false);
  const localUser = useContext(UserContext)[0];
  const { organisation, isLoading: fetchIsLoading } = useOrganisationFetch(
    localUser.organisation.id
  );

  function convertYesNoToBoolean(value) {
    return value.toLowerCase() === "yes" ? true : false;
  }

  function doCleanFormValues(values) {
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

  async function doAddOrganisation(formValues) {
    if (submitIsLoading) return;

    const cleanedFormValues = doCleanFormValues(formValues);

    Object.keys(organisation).forEach(function (key) {
      if (typeof cleanedFormValues[key] !== "undefined") {
        organisation[key] = cleanedFormValues[key];
      }
    });

    setSubmitIsLoading(true);

    const addedOrganisation = await OrganisationService.createOrganisation(
      organisation
    );

    setSubmitIsLoading(false);

    if (addedOrganisation) {
      toast.success(`New organisation ${addedOrganisation.name} created.`);

      navigate("/services");
    } else {
      toast.error("Unable to add organisation.");
    }
  }

  if (fetchIsLoading || submitIsLoading) {
    return <span>Loading</span>;
  }

  return (
    <>
      <h1>Tell us about your organisation</h1>
      <OrganisationForm
        onFormCompletion={doAddOrganisation}
        submitLoading={submitIsLoading}
      />
    </>
  );
};

export default AddOrganisation;
