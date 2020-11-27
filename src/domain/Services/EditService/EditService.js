import React, { useEffect, useState } from "react";
import ServiceForm from "../ServiceForm/ServiceForm";
import useServiceFetch from "../../../hooks/useServiceFetch/useServiceFetch";
import ServiceService from "../../../services/ServiceService/ServiceService";
import { navigate } from "@reach/router";
import { toast } from "react-toastify";
import {
  doCleanServiceFormValues,
  doCleanServiceImage,
  doCleanDefaultValues,
  doHandleHiddenFieldVisibility,
  formatServiceCategories,
  formatServiceDemographics,
  generateInitialShowHiddenField,
} from "../../../utils/functions/serviceFunctions";
import AppLoading from "../../../AppLoading";

const EditService = (props) => {
  const { service, isLoading: fetchIsLoading } = useServiceFetch(
    props.serviceId
  );

  const [defaultValues, setDefaultValues] = useState({});

  const [submitIsLoading, setSubmitIsLoading] = useState(false);
  const [serviceImageIsLoading, setServiceImageIsLoading] = useState(false);

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
          { id: 3, label: "M-health" },
          { id: 4, label: "Homeless" },
          { id: 9, label: "Men" },
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

  useEffect(() => {
    if (fetchIsLoading) return;

    const cleanDefaultValues = doCleanDefaultValues(
      service,
      serviceCategories,
      serviceDemographics
    );

    doHandleHiddenFieldVisibility(
      cleanDefaultValues,
      showHiddenField,
      setShowHiddenField,
      serviceCategories
    );

    setDefaultValues(cleanDefaultValues);
  }, [
    service,
    serviceCategories,
    serviceDemographics,
    showHiddenField,
    fetchIsLoading,
    setDefaultValues,
    setShowHiddenField,
  ]);

  async function doEditService(formValues) {
    if (submitIsLoading) return;

    const cleanFormValues = doCleanServiceFormValues(
      formValues,
      serviceCategories,
      serviceDemographics
    );

    cleanFormValues.updated_at = new Date();

    const serviceImage = doCleanServiceImage(cleanFormValues.image);

    delete cleanFormValues.image;

    setSubmitIsLoading(true);

    console.log(cleanFormValues);

    const updatedService = await ServiceService.updateService(
      props.serviceId,
      cleanFormValues
    );

    const returnedServiceImage = await ServiceService.createServiceImage(
      props.serviceId,
      serviceImage
    );

    setSubmitIsLoading(false);

    if (updatedService && (returnedServiceImage || !cleanFormValues.image)) {
      toast.success(`Service updated.`);

      navigate("/service");
    } else if (updatedService && !returnedServiceImage) {
      toast.warning(
        `New service ${updatedService.name} created but service image failed to upload.`
      );

      navigate("/service");
    } else {
      toast.error("Unable to update service.");
    }
  }

  if (
    fetchIsLoading ||
    Object.keys(defaultValues).length === 0 ||
    serviceImageIsLoading ||
    taxonomiesIsLoading
  ) {
    return <AppLoading />;
  }

  return (
    <>
      <ServiceForm
        pageTitle={"Edit your service listing"}
        onFormCompletion={doEditService}
        defaultValues={defaultValues}
        showHiddenField={showHiddenField}
        setShowHiddenField={setShowHiddenField}
        submitLoading={submitIsLoading}
        serviceCategories={serviceCategories}
        serviceDemographics={serviceDemographics}
      />
    </>
  );
};

export default EditService;
