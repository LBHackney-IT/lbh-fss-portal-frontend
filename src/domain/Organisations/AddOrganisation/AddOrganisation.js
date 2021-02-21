import React, { useContext, useState } from "react";
import OrganisationForm from "../OrganisationForm/OrganisationForm";
import OrganisationService from "../../../services/OrganisationService/OrganisationService";
import { navigate } from "@reach/router";
import { toast } from "react-toastify";
import {
  convertYesNoToBoolean,
  convertCheckboxToBoolean,
  checkIsInternalTeam,
} from "../../../utils/functions/functions";
import {
  organisationFormFields as allFields,
  organisationFormYesNoRadioFields as yesNoRadioFields,
  organisationFormCheckboxFields as checkboxFields,
} from "../../../utils/data/data";
import AuthenticationService from "../../../services/AuthenticationService/AuthenticationService";
import UserContext from "../../../context/UserContext/UserContext";
import AppLoading from "../../../AppLoading";
import UserService from "../../../services/UserService/UserService";

async function fetchMe(setUser, setIsLoading) {
  setIsLoading(true);

  const user = await AuthenticationService.me();

  setIsLoading(false);

  setUser(user);
}

const AddOrganisation = () => {
  const [submitIsLoading, setSubmitIsLoading] = useState(false);
  const [localUser, setLocalUser] = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);

  const [showHiddenField, setShowHiddenField] = useState({
    notBasedInWarning: false,
    charity_number: false,
    community_interest_company_number: false,
    RslOrHaAssociation: false,
    lottery_funded_project: false,
    local_offer_link: false,
    childSafeGuardLead: false,
    childSafeguardLeadDetails: false,
    adultSafeguardLead: false,
    adultSafeguardLeadDetails: false,
  });

  const isInternalTeam = checkIsInternalTeam(localUser.roles);

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

    const createdOrganisation = await OrganisationService.createOrganisation(
      cleanedFormValues
    );

    setSubmitIsLoading(false);

    if (createdOrganisation) {
      if (isInternalTeam) {
        toast.success(
          `New organisation ${createdOrganisation.name} has been submitted for review.`
        );
        navigate("/organisations");
      } else {
        setSubmitIsLoading(true);

        const linkOrganisationSuccessful = await UserService.linkOrganisation({
          organisation_id: createdOrganisation.id,
          user_id: localUser.id,
        });

        setSubmitIsLoading(false);

        if (linkOrganisationSuccessful) {
          toast.success(
            `New organisation ${createdOrganisation.name} has been submitted for review.`
          );

          await fetchMe(setLocalUser, setIsLoading);
          navigate("/service");
        } else {
          toast.warning(
            `New organisation ${createdOrganisation.name} failed to submit, please try again.`
          );
        }
      }
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
