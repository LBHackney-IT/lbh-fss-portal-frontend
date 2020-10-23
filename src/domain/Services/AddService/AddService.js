import React, { useContext, useState } from "react";
import ServiceForm from "../ServiceForm/ServiceForm";
import ServiceService from "../../../services/ServiceService/ServiceService";
import { navigate, Redirect } from "@reach/router";
import { toast } from "react-toastify";
import UserContext from "../../../context/UserContext/UserContext";
import {
  serviceCategoryCheckboxOptions,
  serviceDemographicCheckboxOptions,
} from "../../../utils/data/data";
import {
  doCleanServiceFormValues,
  doCleanServiceImage,
} from "../../../utils/functions/serviceFunctions";
import AccessDenied from "../../Error/AccessDenied/AccessDenied";
import { checkIsInternalTeam } from "../../../utils/functions/functions";

const AddService = () => {
  const localUser = useContext(UserContext)[0];
  const [submitIsLoading, setSubmitIsLoading] = useState(false);

  const [showHiddenField, setShowHiddenField] = useState({
    lonOrIsDetails: false,
    anxOrMHDetails: false,
    safeAndHBDetails: false,
    exAndWellDetails: false,
    artAndCrtvDetails: false,
    foodOrShopDetails: false,
    faithActDetails: false,
    monAdvDetails: false,
    emplAdvDetails: false,
    houseAdvDetails: false,
    immAdvDetails: false,
  });

  async function doAddService(formValues) {
    if (submitIsLoading) return;

    const cleanFormValues = doCleanServiceFormValues(
      formValues,
      serviceCategoryCheckboxOptions,
      serviceDemographicCheckboxOptions
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

    if (service) {
      setSubmitIsLoading(true);

      const returnedServiceImage = await ServiceService.createServiceImage(
        service.id,
        serviceImage
      );

      setSubmitIsLoading(false);

      if (returnedServiceImage) {
        toast.success(`New service ${service.name} created.`);
      } else {
        toast.warning(
          `New service ${service.name} created but service image failed to upload.`
        );
      }

      navigate("/service");
    } else {
      toast.error("Unable to add service.");
    }
  }

  const isInternalTeam = checkIsInternalTeam(localUser.roles);

  if (isInternalTeam) {
    return <Redirect to="/services" noThrow />;
  }

  return localUser.organisation ? (
    <>
      <ServiceForm
        pageTitle={"Create your service listing"}
        onFormCompletion={doAddService}
        defaultValues={
          localUser.organisation ? { name: localUser.organisation.name } : {}
        }
        submitLoading={submitIsLoading}
        showHiddenField={showHiddenField}
        setShowHiddenField={setShowHiddenField}
      />
    </>
  ) : (
    <AccessDenied />
  );
};

export default AddService;
