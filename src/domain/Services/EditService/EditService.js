import React, { useContext, useEffect, useState } from "react";
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
import TaxonomiesService from "../../../services/TaxonomiesService/TaxonomiesService";
import UserContext from "../../../context/UserContext/UserContext";
import { checkIsInternalTeam } from "../../../utils/functions/functions";

const EditService = (props) => {
  const { service, isLoading: fetchIsLoading } = useServiceFetch(
    props.serviceId
  );

  const user = useContext(UserContext)[0];
  const isInternalTeam = checkIsInternalTeam(user.roles);

  const [defaultValues, setDefaultValues] = useState({});

  const [submitIsLoading, setSubmitIsLoading] = useState(false);
  const [serviceImageIsLoading, setServiceImageIsLoading] = useState(false);

  const [taxonomiesIsLoading, setTaxonomiesIsLoading] = useState(true);
  const [serviceCategories, setServiceCategories] = useState([]);
  const [serviceDemographics, setServiceDemographics] = useState([]);

  const [showHiddenField, setShowHiddenField] = useState([]);

  useEffect(() => {
    async function fetchTaxonomies() {
      const taxonomies = await TaxonomiesService.retrieveTaxonomies();

      setTaxonomiesIsLoading(false);

      if (taxonomies) {
        const formattedServiceCategories = formatServiceCategories({
          serviceCategories: taxonomies.categories,
        });

        const formattedServiceDemographics = formatServiceDemographics({
          serviceDemographics: taxonomies.demographics,
        });
  serviceDemographicCheckboxOptions.forEach((item) => {
    const demographicId = item.value;
    const demographicName = item.id;

    if (demographicIdArray.includes(demographicId)) {
      newValues[demographicName] = true;
    }
  });

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

    if (serviceCategories.length > 0 && serviceDemographics.length > 0) {
      doHandleHiddenFieldVisibility(
        cleanDefaultValues,
        showHiddenField,
        setShowHiddenField,
        serviceCategories
      );

      setDefaultValues(cleanDefaultValues);
    }
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
        initialStepId={isInternalTeam ? "organisation" : "details"}
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
