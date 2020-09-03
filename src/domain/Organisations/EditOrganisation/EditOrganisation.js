import React, { useState } from "react";
import OrganisationForm from "../OrganisationForm/OrganisationForm";
import useOrganisationFetch from "../../../hooks/useOrganisationFetch/useOrganisationFetch";
import OrganisationService from "../../../services/OrganisationService/OrganisationService";
import { navigate } from "@reach/router";
import { toast } from "react-toastify";

const EditOrganisation = (props) => {
  const { organisation, isLoading: fetchIsLoading } = useOrganisationFetch(
    props.organisationId
  );
  const [submitIsLoading, setSubmitIsLoading] = useState(false);

  async function doEditOrganisation(formValues) {
    if (submitIsLoading) return;

    setSubmitIsLoading(true);

    const organisation = await OrganisationService.updateOrganisation(
      props.organisationId,
      formValues
    );

    setSubmitIsLoading(false);

    if (organisation) {
      toast.success(`Organisation ${organisation.name} updated.`);

      navigate("/services");
    } else {
      toast.error("Unable to update organisation.");
    }
  }

  if (fetchIsLoading) {
    return "Loading";
  }

  return (
    <>
      <OrganisationForm
        onFormCompletion={doEditOrganisation}
        organisation={organisation}
        submitLoading={submitIsLoading}
      />
    </>
  );
};

export default EditOrganisation;
