import React, { useState, useEffect, useContext } from "react";
import OrganisationForm from "../OrganisationForm/OrganisationForm";
import useOrganisationFetch from "../../../hooks/useOrganisationFetch/useOrganisationFetch";
import OrganisationService from "../../../services/OrganisationService/OrganisationService";
import { navigate } from "@reach/router";
import { toast } from "react-toastify";
import {
  convertBooleanToYesNo,
  convertYesNoToBoolean,
} from "../../../utils/functions/functions";
import {
  organisationFormFields as allFields,
  organisationFormYesNoRadioFields as yesNoRadioFields,
} from "../../../utils/data/data";

// TODO: will need to do rest of hidden field pass downs
// TODO: convert training month to drop down, rather than digit

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

  if (!values.isRegisteredCharity) {
    values.charityNumber = false;
  }

  if (!values.isTraRegistered) {
    values.rslOrHaAssociation = false;
  }

  if (!values.isLotteryFunded) {
    values.lotteryFundedProject = false;
  }
  if (!values.isLocalOfferListed) {
    values.localOfferLink = false;
  }

  if (!values.hasChildSafeguardingLead) {
    values.childSafeguardingLeadFirstName = false;
    values.childSafeguardingLeadLastName = false;
    values.childSafeguardingLeadTrainingMonth = false;
    values.childSafeguardingLeadTrainingYear = false;
  }

  if (!values.hasAdultSupport) {
    values.hasAdultSafeguardingLead = false;
  }

  if (!values.hasAdultSafeguardingLead) {
    values.adultSafeguardingLeadFirstName = false;
    values.adultSafeguardingLeadLastName = false;
    values.adultSafeguardingLeadTrainingMonth = false;
    values.adultSafeguardingLeadTrainingYear = false;
  }

  return values;
}

function doHandleHiddenFields(
  organisation,
  showHiddenField,
  setShowHiddenField
) {
  if (organisation.hasChildSupport) {
    showHiddenField.childSafeGuardLead = true;
  }

  if (organisation.hasChildSafeguardingLead) {
    showHiddenField.childSafeguardLeadDetails = true;
  }

  if (organisation.hasAdultSupport) {
    showHiddenField.adultSafeGuardLead = true;
  }

  if (organisation.hasAdultSafeguardingLead) {
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
  const [submitIsLoading, setSubmitIsLoading] = useState(false);
  const [defaultValues, setDefaultValues] = useState({});

  const [showHiddenField, setShowHiddenField] = useState({
    childSafeGuardLead: false,
    childSafeguardLeadDetails: false,
    adultSafeGuardLead: false,
    adultSafeguardLeadDetails: false,
  });

  const {
    organisation,
    isLoading: organisationFetchIsLoading,
  } = useOrganisationFetch(props.organisationId);

  useEffect(() => {
    if (organisationFetchIsLoading) return;

    doHandleHiddenFields(organisation, showHiddenField, setShowHiddenField);

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

    console.log("organisationWithUpdatedFields");
    console.log(organisationWithUpdatedFields);

    const updatedOrganisation = await OrganisationService.updateOrganisation(
      props.organisationId,
      organisation
      // organisationWithUpdatedFields
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
        showHiddenField={showHiddenField}
        setShowHiddenField={setShowHiddenField}
        submitLoading={submitIsLoading}
        enableAllLinks={true}
      />
    </>
  );
};

export default EditOrganisation;
