import React, { useEffect, useState } from "react";
import ServiceForm from "../ServiceForm/ServiceForm";
import useServiceFetch from "../../../hooks/useServiceFetch/useServiceFetch";
import ServiceService from "../../../services/ServiceService/ServiceService";
import { navigate } from "@reach/router";
import { toast } from "react-toastify";
import { serviceCategoryCheckboxOptions } from "../../../utils/data/data";

function doFormatDefaultValuesCategories(values) {
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

function doFormatDefaultValuesLocations(values) {
  let newValues = values;
  console.log(values.locations);

  return newValues;
}

function doCleanDefaultValues(values) {
  let cleanDefaultValues = {};
  cleanDefaultValues = doFormatDefaultValuesCategories(values);
  cleanDefaultValues = doFormatDefaultValuesLocations(cleanDefaultValues);

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
    if (fetchIsLoading) return;

    const cleanDefaultValues = doCleanDefaultValues(
      service,
      showHiddenField,
      setShowHiddenField
    );

    doHandleHiddenFieldVisibility(
      cleanDefaultValues,
      showHiddenField,
      setShowHiddenField
    );

    setDefaultValues(cleanDefaultValues);
  }, [service, fetchIsLoading, setDefaultValues]);

  async function doEditService(formValues) {
    if (submitIsLoading) return;

    setSubmitIsLoading(true);

    const service = await ServiceService.updateService(
      props.serviceId,
      formValues
    );

    setSubmitIsLoading(false);

    if (service) {
      toast.success(`Service ${service.name} updated.`);

      navigate("/service");
    } else {
      toast.error("Unable to update service.");
    }
  }

  if (fetchIsLoading || Object.keys(defaultValues).length === 0) {
    return <div data-testid="loading">Loading...</div>;
  }

  return (
    <>
      <span>Your service</span>
      <h1>Edit your service listing</h1>
      <ServiceForm
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
