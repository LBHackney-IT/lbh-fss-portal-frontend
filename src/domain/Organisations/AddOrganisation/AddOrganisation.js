import React, { useContext, useState } from "react";
import OrganisationForm from "../OrganisationForm/OrganisationForm";
import OrganisationService from "../../../services/OrganisationService/OrganisationService";
import { navigate } from "@reach/router";
import { toast } from "react-toastify";
import {
  convertYesNoToBoolean,
  convertCheckboxToBoolean,
} from "../../../utils/functions/functions";
import {
  organisationFormFields as allFields,
  organisationFormYesNoRadioFields as yesNoRadioFields,
  organisationFormCheckboxFields as checkboxFields,
} from "../../../utils/data/data";
import AuthenticationService from "../../../services/AuthenticationService/AuthenticationService";
import UserContext from "../../../context/UserContext/UserContext";
import AppLoading from "../../../AppLoading";

async function fetchMe(setUser, setIsLoading) {
  setIsLoading(true);

  const user = await AuthenticationService.me();

  setIsLoading(false);

  setUser(user);
}

const AddOrganisation = () => {
  const [submitIsLoading, setSubmitIsLoading] = useState(false);
  const setLocalUser = useContext(UserContext)[1];
  const [isLoading, setIsLoading] = useState(false);

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

    const organisationAdded = await OrganisationService.createOrganisation(
      cleanedFormValues
    );

    setSubmitIsLoading(false);

    if (organisationAdded) {
      toast.success(
        `New organisation ${organisationAdded.name} has been submitted for review.`
      );

      fetchMe(setLocalUser, setIsLoading);
      navigate("/organisation");
    } else {
      toast.error("Unable to add organisation.");
    }
  }

  if (submitIsLoading || isLoading) {
    return <AppLoading />;
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
