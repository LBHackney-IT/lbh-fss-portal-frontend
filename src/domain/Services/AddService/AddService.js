import React, { useState } from "react";
import ServiceForm from "../ServiceForm/ServiceForm";
import ServiceService from "../../../services/ServiceService/ServiceService";
import { navigate } from "@reach/router";
import { toast } from "react-toastify";

const AddService = () => {
  const [submitIsLoading, setSubmitIsLoading] = useState(false);

  async function doAddService(formValues) {
    if (submitIsLoading) return;

    setSubmitIsLoading(true);

    const service = await ServiceService.createService(formValues);

    setSubmitIsLoading(false);

    console.log(service);

    if (service) {
      console.log('success');
      toast.success(`New service ${service.name} created.`);

      navigate("/services");
    } else {
      console.log('fail');
      toast.error("Unable to add service.");
    }
  }

  return (
    <>
      <h1>Create your service listing</h1>
      <ServiceForm
        onFormCompletion={doAddService}
        submitLoading={submitIsLoading}
      />
    </>
  );
};

export default AddService;
