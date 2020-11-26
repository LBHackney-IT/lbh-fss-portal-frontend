import React, { useContext, useState } from "react";
import ServiceForm from "../ServiceForm/ServiceForm";
import ServiceService from "../../../services/ServiceService/ServiceService";
import { navigate, Redirect } from "@reach/router";
import { toast } from "react-toastify";
import UserContext from "../../../context/UserContext/UserContext";
import {
  serviceCategories,
  serviceDemographics,
} from "../../../utils/data/data";
import {
  doCleanServiceFormValues,
  doCleanServiceImage,
} from "../../../utils/functions/serviceFunctions";
import { checkIsInternalTeam } from "../../../utils/functions/functions";

function generateInitialShowHiddenField(serviceCategories) {
  let initialShowHiddenField = {};

  // loop through each service category, and set show status to false for each additional information ('details') fields
  serviceCategories.forEach((category) => {
    initialShowHiddenField[category.details] = false;
  });

  return initialShowHiddenField;
}

const AddService = ({ doRetrieveServices = () => {} }) => {
  const localUser = useContext(UserContext)[0];
  const [submitIsLoading, setSubmitIsLoading] = useState(false);

  const [showHiddenField, setShowHiddenField] = useState(
    generateInitialShowHiddenField(serviceCategories)
  );

  async function doAddService(formValues) {
    if (submitIsLoading) return;

    const cleanFormValues = doCleanServiceFormValues(
      formValues,
      serviceCategories,
      serviceDemographics
    );

    cleanFormValues.user_id = localUser.id;
    cleanFormValues.user_name = localUser.name;
    cleanFormValues.organisation_id = localUser.organisation.id;
    cleanFormValues.organisation_name = localUser.organisation.name;
    cleanFormValues.status = "active";
    cleanFormValues.created_at = new Date();
    cleanFormValues.updated_at = null;

    const serviceImage = doCleanServiceImage(cleanFormValues.image);

    setSubmitIsLoading(true);

    const service = await ServiceService.createService(cleanFormValues);

    setSubmitIsLoading(false);

    if (service && cleanFormValues.image) {
      setSubmitIsLoading(true);

      const returnedServiceImage = await ServiceService.createServiceImage(
        service.id,
        serviceImage
      );

      setSubmitIsLoading(false);

      if (returnedServiceImage || !cleanFormValues.image) {
        toast.success(`New service ${service.name} created.`);
        doRetrieveServices();
        navigate("/service");
      } else {
        toast.warning(
          `New service ${service.name} created but service image failed to upload.`
        );
      }
    } else if (service) {
      toast.success(`New service ${service.name} created.`);
      doRetrieveServices();
      navigate("/service");
    } else {
      toast.error("Unable to add service.");
    }
  }

  const isInternalTeam = checkIsInternalTeam(localUser.roles);

  if (isInternalTeam) {
    return <Redirect to="/services" noThrow />;
  }

  return (
    <>
      <ServiceForm
        pageTitle={"Tell us what you do"}
        onFormCompletion={doAddService}
        defaultValues={
          localUser.organisation ? { name: localUser.organisation.name } : {}
        }
        submitLoading={submitIsLoading}
        showHiddenField={showHiddenField}
        setShowHiddenField={setShowHiddenField}
      />
    </>
  );
};

export default AddService;
