import React, { useContext, useState } from "react";
import ServiceForm from "../ServiceForm/ServiceForm";
import ServiceService from "../../../services/ServiceService/ServiceService";
import { navigate } from "@reach/router";
import { toast } from "react-toastify";
import useServiceFetch from "../../../hooks/useServiceFetch/useServiceFetch";
import UserContext from "../../../context/UserContext/UserContext";
import {
  serviceCategoryFields,
  serviceDemographicsFields,
} from "../../../utils/data/data";

function doFormatDemographics(values) {
  let formattedValues = values;
  let demographicsArray = [];

  serviceDemographicsFields.forEach((demographicField) => {
    if (values[demographicField]) {
      demographicsArray.push(values[demographicField]);
    }
    delete formattedValues[demographicField];
  });

  formattedValues.demographics = demographicsArray;

  return formattedValues;
}

function doFormatCategories(values) {
  let formattedValues = { ...values };
  let categoryArray = [];

  serviceCategoryFields.forEach((categoryField) => {
    if (values[categoryField] && categoryField.search("Details") === -1) {
      categoryArray.push(categoryField);
    }
    delete formattedValues[categoryField];
  });

  let formattedCategories = [];

  categoryArray.forEach((category) => {
    formattedCategories.push({
      id: values[category],
      description: values[category.concat("Details")] || "",
    });
  });

  formattedValues.categories = formattedCategories;

  return formattedValues;
}

function doCleanFormValues(values) {
  let cleanFormValues = {};
  cleanFormValues = doFormatCategories(values);
  cleanFormValues = doFormatDemographics(cleanFormValues);

  return cleanFormValues;
}

const AddService = () => {
  const localUser = useContext(UserContext)[0];
  const [submitIsLoading, setSubmitIsLoading] = useState(false);
  // TODO: find out how a user or organisation is related to a service

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

    const cleanFormValues = doCleanFormValues(formValues);

    setSubmitIsLoading(true);

    const service = await ServiceService.createService(cleanFormValues);

    setSubmitIsLoading(false);

    if (service) {
      toast.success(`New service ${service.name} created.`);

      navigate("/service");
    } else {
      toast.error("Unable to add service.");
    }
  }

  return (
    <>
      <ServiceForm
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
