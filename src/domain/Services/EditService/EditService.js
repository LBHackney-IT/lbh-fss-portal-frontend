import React, { useState } from "react";
import ServiceForm from "../ServiceForm/ServiceForm";
import useServiceFetch from "../../../hooks/useServiceFetch/useServiceFetch";
import ServiceService from "../../../services/ServiceService/ServiceService";
import { navigate } from "@reach/router";
import { toast } from "react-toastify";

const EditService = (props) => {
  const { service, isLoading: fetchIsLoading } = useServiceFetch(
    props.serviceId
  );
  const [submitIsLoading, setSubmitIsLoading] = useState(false);

  async function doEditService(formValues) {
    if (submitIsLoading) return;

    setSubmitIsLoading(true);

    const service = await ServiceService.updateService(
      props.serviceId,
      formValues
    );

    setSubmitIsLoading(false);

    if (service) {
      toast.success(`New service ${service.name} updated.`);

      navigate("/services");
    } else {
      toast.error("Unable to update service.");
    }
  }

  if (fetchIsLoading) {
    return "<div data-testid='loading'>Loading</div>";
  }

  return (
    <>
      <span>Your service</span>
      <h1>Edit your service listing</h1>
      <ServiceForm
        onFormCompletion={doEditService}
        service={service}
        submitLoading={submitIsLoading}
      />
    </>
  );
};

export default EditService;
