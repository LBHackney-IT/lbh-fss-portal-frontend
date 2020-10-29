import React, { useState, useEffect, useContext } from "react";
import OrganisationForm from "../OrganisationForm/OrganisationForm";
import useOrganisationFetch from "../../../hooks/useOrganisationFetch/useOrganisationFetch";
import OrganisationService from "../../../services/OrganisationService/OrganisationService";
import { navigate } from "@reach/router";
import { toast } from "react-toastify";
import {
  convertBooleanToYesNo,
  convertYesNoToBoolean,
  convertCheckboxToBoolean,
  checkIsInternalTeam,
} from "../../../utils/functions/functions";
import {
  organisationFormFields as allFields,
  organisationFormYesNoRadioFields as yesNoRadioFields,
  organisationFormCheckboxFields as checkboxFields,
} from "../../../utils/data/data";
import UserContext from "../../../context/UserContext/UserContext";
import AppLoading from "../../../AppLoading";

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

  checkboxFields.forEach((field) => {
    if (field in values) {
      values[field] = convertCheckboxToBoolean(values[field]);
    }
  });

  if (values.status === "rejected") {
    values.status = "awaiting reverification";
  }

  if (values.status === "awaiting reverification") {
    values.status = "published";
  }

  return values;
}

function doHandleHiddenFieldVisibility(
  organisation,
  showHiddenField,
  setShowHiddenField
) {
  if (!organisation.is_hackney_based) {
    showHiddenField.notBasedInWarning = true;
  }

  if (organisation.is_registered_charity) {
    showHiddenField.charity_number = true;
  }
  if (organisation.is_tra_registered) {
    showHiddenField.RslOrHaAssociation = true;
  }
  if (organisation.is_lottery_funded) {
    showHiddenField.lottery_funded_project = true;
  }
  if (organisation.is_local_offer_listed) {
    showHiddenField.local_offer_link = true;
  }

  if (organisation.has_child_support) {
    showHiddenField.childSafeGuardLead = true;
  }

  if (organisation.has_child_safeguarding_lead) {
    showHiddenField.childSafeguardLeadDetails = true;
  }

  if (organisation.has_adult_support) {
    showHiddenField.adultSafeguardLead = true;
  }

  if (organisation.has_adult_safeguarding_lead) {
    showHiddenField.adultSafeguardLeadDetails = true;
  }

  setShowHiddenField(showHiddenField);
}

function doAppendUpdatedFields(organisation, formFields) {
  Object.keys(organisation).forEach(function (key) {
    if (typeof formFields[key] !== "undefined") {
      organisation[key] = formFields[key];
    }
  });
  return organisation;
}

const EditOrganisation = (props) => {
  const user = useContext(UserContext)[0];
  const [submitIsLoading, setSubmitIsLoading] = useState(false);
  const [defaultValues, setDefaultValues] = useState({});

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

  const {
    organisation,
    isLoading: organisationFetchIsLoading,
  } = useOrganisationFetch(props.organisationId);

  useEffect(() => {
    if (organisationFetchIsLoading) return;

    doHandleHiddenFieldVisibility(
      organisation,
      showHiddenField,
      setShowHiddenField
    );

    const cleanedDefaultValues = doCleanDefaultValues(organisation);

    setDefaultValues(cleanedDefaultValues);
  }, [organisation, organisationFetchIsLoading, setDefaultValues]);

  async function doEditOrganisation(formValues) {
    if (submitIsLoading) return;

    setSubmitIsLoading(true);

    const cleanFormValues = doCleanFormValues(formValues);

    const organisationWithUpdatedFields = doAppendUpdatedFields(
      organisation,
      cleanFormValues
    );

    const updatedOrganisation = await OrganisationService.updateOrganisation(
      props.organisationId,
      organisationWithUpdatedFields
    );

    setSubmitIsLoading(false);

    if (updatedOrganisation) {
      if (updatedOrganisation.status === "awaiting reverification") {
        toast.warning(
          `Organisation ${updatedOrganisation.name} has been submitted for review.`
        );
      } else {
        toast.success(
          `Organisation ${updatedOrganisation.name} has been updated.`
        );
      }

      const isInternalTeam = checkIsInternalTeam(user.roles);

      if (isInternalTeam) {
        navigate("/organisations");
      } else {
        navigate("/service");
      }
    } else {
      toast.error("Unable to update organisation.");
    }
  }

  if (organisationFetchIsLoading || Object.keys(defaultValues).length === 0) {
    return <AppLoading />;
  }

  return (
    <>
      <OrganisationForm
        onFormCompletion={doEditOrganisation}
        defaultValues={defaultValues}
        showHiddenField={showHiddenField}
        setShowHiddenField={setShowHiddenField}
        submitLoading={submitIsLoading}
      />
    </>
  );
};

export default EditOrganisation;
