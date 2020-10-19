import React, { useContext, useState } from "react";
import OrganisationForm from "../OrganisationForm/OrganisationForm";
import OrganisationService from "../../../services/OrganisationService/OrganisationService";
import { navigate } from "@reach/router";
import { toast } from "react-toastify";
// import useOrganisationFetch from "../../../hooks/useOrganisationFetch/useOrganisationFetch";
// import UserContext from "../../../context/UserContext/UserContext";
import {
  convertYesNoToBoolean,
  convertCheckboxToBoolean,
} from "../../../utils/functions/functions";
import {
  organisationFormFields as allFields,
  organisationFormYesNoRadioFields as yesNoRadioFields,
  organisationFormCheckboxFields as checkboxFields,
} from "../../../utils/data/data";

const AddOrganisation = () => {
  const [submitIsLoading, setSubmitIsLoading] = useState(false);
  // const localUser = useContext(UserContext)[0];
  // const { organisation, isLoading: fetchIsLoading } = useOrganisationFetch(
  //   localUser.organisation.id
  // );

  const [showHiddenField, setShowHiddenField] = useState({
    notBasedInWarning: false,
    charity_number: false,
    RslOrHaAssociation: false,
    lottery_funded_project: false,
    local_offer_link: false,
    childSafeGuardLead: false,
    childSafeguardLeadDetails: false,
    adultSafeguardLead: false,
    adultSafeguardLeadDetails: false,
  });

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

    checkboxFields.forEach((field) => {
      if (field in values) {
        values[field] = convertCheckboxToBoolean(values[field]);
      }
    });

    values.id = null;
    values.created_at = new Date();
    values.updated_at = null;
    values.submitted_at = new Date();
    values.reviewed = null;
    values.reviewer_id = null;
    values.status = "awaiting review";

    return values;
  }

  async function doAddOrganisation(formValues) {
    if (submitIsLoading) return;

    const cleanedFormValues = doCleanFormValues(formValues);

    setSubmitIsLoading(true);

    const addedOrganisation = await OrganisationService.createOrganisation(
      cleanedFormValues
    );

    setSubmitIsLoading(false);

    if (addedOrganisation) {
      toast.success(`New organisation ${addedOrganisation.name} created.`);

      navigate("/service");
    } else {
      toast.error("Unable to add organisation.");
    }
  }

  if (submitIsLoading) {
    return <span>Loading</span>;
  }

  return (
    <>
      <OrganisationForm
        onFormCompletion={doAddOrganisation}
        submitLoading={submitIsLoading}
        showHiddenField={showHiddenField}
        setShowHiddenField={setShowHiddenField}
      />
    </>
  );
};

export default AddOrganisation;
