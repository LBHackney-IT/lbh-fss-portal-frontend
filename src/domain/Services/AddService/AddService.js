import React, { useContext, useEffect, useState } from "react";
import ServiceForm from "../ServiceForm/ServiceForm";
import ServiceService from "../../../services/ServiceService/ServiceService";
import { navigate, Redirect } from "@reach/router";
import { toast } from "react-toastify";
import UserContext from "../../../context/UserContext/UserContext";
import {
  doCleanServiceFormValues,
  doCleanServiceImage,
  formatServiceCategories,
  formatServiceDemographics,
  generateInitialShowHiddenField,
} from "../../../utils/functions/serviceFunctions";
import { checkIsInternalTeam } from "../../../utils/functions/functions";
import AppLoading from "../../../AppLoading";

const AddService = ({ doRetrieveServices = () => {} }) => {
  const localUser = useContext(UserContext)[0];
  const [submitIsLoading, setSubmitIsLoading] = useState(false);
  const [taxonomiesIsLoading, setTaxonomiesIsLoading] = useState(true);
  const [serviceCategories, setServiceCategories] = useState([]);
  const [serviceDemographics, setServiceDemographics] = useState([]);

  const [showHiddenField, setShowHiddenField] = useState([]);

  useEffect(() => {
    async function fetchTaxonomies() {
      // TODO: replace this with API call
      // const taxonomies = TaxonomiesService.retrieveTaxonomies();
      const taxonomies = {
        serviceCategories: [
          { id: 1, label: "Category A - yes" },
          { id: 2, label: "Category B - no" },
        ],
        serviceDemographics: [
          { id: 3, label: "text text text" },
          { id: 4, label: "text text text" },
        ],
      };

      setTaxonomiesIsLoading(false);

      if (taxonomies) {
        const formattedServiceCategories = formatServiceCategories(
          taxonomies.serviceCategories
        );

        const formattedServiceDemographics = formatServiceDemographics(
          taxonomies.serviceDemographics
        );

        setServiceCategories(formattedServiceCategories);
        setServiceDemographics(formattedServiceDemographics);
        setShowHiddenField(
          generateInitialShowHiddenField(formattedServiceCategories)
        );
      } else {
        toast.error("An error occured, please try again.");
        navigate("/service");
      }
    }

    fetchTaxonomies();
  }, [setServiceCategories, setServiceDemographics, setShowHiddenField]);

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

  if (taxonomiesIsLoading) {
    return <AppLoading />;
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
        serviceCategories={serviceCategories}
        serviceDemographics={serviceDemographics}
      />
    </>
  );
};

export default AddService;
