import React, { useEffect, useState } from "react";
import ServiceForm from "../ServiceForm/ServiceForm";
import useServiceFetch from "../../../hooks/useServiceFetch/useServiceFetch";
import ServiceService from "../../../services/ServiceService/ServiceService";
import { navigate } from "@reach/router";
import { toast } from "react-toastify";
import {
  serviceCategoryCheckboxOptions,
  serviceDemographicCheckboxOptions,
} from "../../../utils/data/data";
import {
  doCleanServiceFormValues,
  doCleanServiceImage,
} from "../../../utils/functions/serviceFunctions";

function doFormatCategoryDefaultValues(values) {
  const categoryIdArray = values.categories.map((category) => {
    return category.id;
  });

  let newValues = values;

  serviceCategoryCheckboxOptions.forEach((item) => {
    if (categoryIdArray.includes(item.value)) {
      const categoryInfo = values.categories.filter((category) => {
        return category.id === item.value;
      });

      newValues[item.id] = true;
      newValues[item.id.concat("Details")] = categoryInfo[0].description;
    }
  });

  delete newValues.categories;

  return newValues;
}

function doFormatDemographicDefaultValues(values) {
  const demographicIdArray = values.demographics.map((demographic) => {
    return demographic.id;
  });

  let newValues = values;

  if (
    demographicIdArray.length ===
    serviceDemographicCheckboxOptions.length - 1
  ) {
    newValues.everyone = true;
    delete newValues.demographics;
    return newValues;
  }

  serviceDemographicCheckboxOptions.forEach((item) => {
    const demographicId = item.value;
    const demographicName = item.id;

    if (demographicIdArray.includes(demographicId)) {
      newValues[demographicName] = true;
    }
  });

  delete newValues.demographics;

  return newValues;
}

function doCleanDefaultValues(values) {
  let cleanDefaultValues = {};
  cleanDefaultValues = doFormatCategoryDefaultValues(values);
  cleanDefaultValues = doFormatDemographicDefaultValues(cleanDefaultValues);

  return cleanDefaultValues;
}

function doHandleHiddenFieldVisibility(
  cleanDefaultValues,
  showHiddenField,
  setShowHiddenField
) {
  if (cleanDefaultValues.lonOrIs) {
    showHiddenField.lonOrIsDetails = true;
  }

  if (cleanDefaultValues.anxOrMH) {
    showHiddenField.anxOrMHDetails = true;
  }

  if (cleanDefaultValues.safeAndHB) {
    showHiddenField.safeAndHBDetails = true;
  }

  if (cleanDefaultValues.exAndWell) {
    showHiddenField.exAndWellDetails = true;
  }

  if (cleanDefaultValues.artAndCrtv) {
    showHiddenField.artAndCrtvDetails = true;
  }

  if (cleanDefaultValues.foodOrShop) {
    showHiddenField.foodOrShopDetails = true;
  }
  if (cleanDefaultValues.faithAct) {
    showHiddenField.faithActDetails = true;
  }
  if (cleanDefaultValues.monAdv) {
    showHiddenField.monAdvDetails = true;
  }
  if (cleanDefaultValues.emplAdv) {
    showHiddenField.emplAdvDetails = true;
  }
  if (cleanDefaultValues.houseAdv) {
    showHiddenField.houseAdvDetails = true;
  }
  if (cleanDefaultValues.immAdv) {
    showHiddenField.immAdvDetails = true;
  }

  setShowHiddenField(showHiddenField);
}

const EditService = (props) => {
  const { service, isLoading: fetchIsLoading } = useServiceFetch(
    props.serviceId
  );

  const [defaultValues, setDefaultValues] = useState({});

  const [submitIsLoading, setSubmitIsLoading] = useState(false);
  const [serviceImageIsLoading, setServiceImageIsLoading] = useState(false);

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

  useEffect(() => {
    async function handleDefaultValues() {
      if (fetchIsLoading) return;

      setServiceImageIsLoading(true);

      const serviceImage = await ServiceService.createServiceImage(
        props.serviceId,
        null
      );

      setServiceImageIsLoading(false);

      console.log(serviceImage.url);

      service.image.preview = serviceImage.url;

      const cleanDefaultValues = doCleanDefaultValues(service);

      doHandleHiddenFieldVisibility(
        cleanDefaultValues,
        showHiddenField,
        setShowHiddenField
      );

      setDefaultValues(cleanDefaultValues);
    }

    handleDefaultValues();
  }, [service, fetchIsLoading, setDefaultValues]);

  async function doEditService(formValues) {
    if (submitIsLoading) return;

    const cleanFormValues = doCleanServiceFormValues(
      formValues,
      serviceCategoryCheckboxOptions,
      serviceDemographicCheckboxOptions
    );

    cleanFormValues.updated_at = new Date();

    const serviceImage = doCleanServiceImage(cleanFormValues.image);

    delete cleanFormValues.image;

    setSubmitIsLoading(true);

    const updatedService = await ServiceService.updateService(
      props.serviceId,
      cleanFormValues
    );

    const returnedServiceImage = await ServiceService.createServiceImage(
      props.serviceId,
      serviceImage
    );

    setSubmitIsLoading(false);

    if (updatedService && returnedServiceImage) {
      toast.success(`New service ${updatedService.name} created.`);

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
    serviceImageIsLoading
  ) {
    return <div data-testid="loading">Loading...</div>;
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
      />
    </>
  );
};

export default EditService;
