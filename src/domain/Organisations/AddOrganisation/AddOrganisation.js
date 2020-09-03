import React, { useState } from "react";
import OrganisationForm from "../OrganisationForm/OrganisationForm";
import OrganisationService from "../../../services/OrganisationService/OrganisationService";
import { navigate } from "@reach/router";
import { toast } from "react-toastify";

const AddOrganisation = () => {
  const [submitIsLoading, setSubmitIsLoading] = useState(false);

  async function doAddOrganisation(formValues) {
    if (submitIsLoading) return;

    setSubmitIsLoading(true);

    const organisation = await OrganisationService.createService(formValues);

    setSubmitIsLoading(false);

    if (organisation) {
      toast.success(`New organisation ${organisation.name} created.`);

      navigate("/services");
    } else {
      toast.error("Unable to add organisation.");
    }
  }

  return (
    <>
      <div>Step One</div>
      <h1>Tell us about your organisation</h1>
      <OrganisationForm
        onFormCompletion={doAddOrganisation}
        submitLoading={submitIsLoading}
      />
    </>
  );
};

export default AddOrganisation;
