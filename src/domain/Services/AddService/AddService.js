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

const AddService = ({ doRetrieveServices = () => {} }) => {
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
    cleanFormValues.status = "active";
    cleanFormValues.created_at = new Date();
    cleanFormValues.updated_at = null;

    if (!cleanFormValues.organisation_id) {
      cleanFormValues.organisation_id = localUser.organisation.id;
      cleanFormValues.organisation_name = localUser.organisation.name;
    }

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

  return (
    <>
      <ServiceForm
        initialStepId={isInternalTeam ? "organisation" : "details"}
        pageTitle={"Tell us what you do"}
        onFormCompletion={doAddService}
        defaultValues={
          !isInternalTeam && localUser.organisation
            ? { name: localUser.organisation.name }
            : {}
        }
        submitLoading={submitIsLoading}
        showHiddenField={showHiddenField}
        setShowHiddenField={setShowHiddenField}
      />
    </>
  );
};

export default AddService;
