import React, { useContext, useState } from "react";
import ServiceForm from "../ServiceForm/ServiceForm";
import ServiceService from "../../../services/ServiceService/ServiceService";
import { navigate } from "@reach/router";
import { toast } from "react-toastify";
import useServiceFetch from "../../../hooks/useServiceFetch/useServiceFetch";
import UserContext from "../../../context/UserContext/UserContext";

const AddService = () => {
  const localUser = useContext(UserContext)[0];
  const [submitIsLoading, setSubmitIsLoading] = useState(false);
  // TODO: find out how a user or organisation is related to a service

  const [showHiddenField, setShowHiddenField] = useState({
    lonOrIsDetails: false,
    exAndWellDetails: false,
    houseAdvDetails: false,
  });

  async function doAddService(formValues) {
    if (submitIsLoading) return;

    setSubmitIsLoading(true);

    const service = await ServiceService.createService(formValues);

    setSubmitIsLoading(false);

    if (service) {
      toast.success(`New service ${service.name} created.`);

      navigate("/services");
    } else {
      toast.error("Unable to add service.");
    }
  }

  //

  return (
    <>
      <ServiceForm
        onFormCompletion={doAddService}
        submitLoading={submitIsLoading}
        showHiddenField={showHiddenField}
        setShowHiddenField={setShowHiddenField}
      />
    </>
  );
};

export default AddService;
