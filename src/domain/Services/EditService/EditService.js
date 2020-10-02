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

function doFormatDemographicFormValues(values) {
  let newValues = values;
  let demographicsArray = [];
  serviceDemographicCheckboxOptions.forEach((item) => {
    const demographicOptionSelected = Boolean(values[item.id]);

    if (demographicOptionSelected) {
      demographicsArray.push(item.value);
    }
    delete newValues[item.id];
  });

  if (demographicsArray.includes(999)) {
    newValues.demographics = serviceDemographicCheckboxOptions
      .filter((item) => item.value !== 999)
      .map((item) => item.value);
  } else {
    newValues.demographics = demographicsArray;
  }

  return newValues;
}

function doFormatCategoryFormValues(values) {
  let newValues = values;
  let categoriesArray = [];
  serviceCategoryCheckboxOptions.forEach((item) => {
    if (values[item.id]) {
      categoriesArray.push({
        id: item.value,
        description: values[item.id.concat("Details")],
      });
    }
    delete newValues[item.id];
    delete newValues[item.id.concat("Details")];
  });

  newValues.categories = categoriesArray;

  return newValues;
}
function doConvertIntoFormData(values) {
  let formData = new FormData();

  Object.keys(values).forEach((key) => {
    formData.append(key, values[key]);
  });

  return formData;
}

function doCleanFormValues(values) {
  let cleanFormValues = {};
  cleanFormValues = doFormatDemographicFormValues(values);
  cleanFormValues = doFormatCategoryFormValues(cleanFormValues);
  cleanFormValues = doConvertIntoFormData(cleanFormValues);

  return cleanFormValues;
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

    const cleanDefaultValues = doCleanDefaultValues(service);

    doHandleHiddenFieldVisibility(
      cleanDefaultValues,
      showHiddenField,
      setShowHiddenField
    );

    setDefaultValues(cleanDefaultValues);
  }, [service, fetchIsLoading, setDefaultValues]);

  async function doEditService(formValues) {
    if (submitIsLoading) return;

    const cleanFormValues = doCleanFormValues(formValues);

    setSubmitIsLoading(true);

    console.log("cleanFormValues pre-submit to updateService ");
    console.log(cleanFormValues);

    const service = await ServiceService.updateService(
      props.serviceId,
      cleanFormValues
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
