import { camelCase } from "lodash";

function doFormatServiceDemographicFormValues(values, serviceDemographics) {
  let newValues = values;
  let demographicsArray = [];
  serviceDemographics.forEach((item) => {
    const demographicOptionSelected = Boolean(values[item.name]);

    if (demographicOptionSelected) {
      demographicsArray.push(item.id);
    }
    delete newValues[item.name];
  });

  if (demographicsArray.includes(999)) {
    newValues.demographics = serviceDemographics
      .filter((item) => item.id !== 999)
      .map((item) => item.id);
  } else {
    newValues.demographics = demographicsArray;
  }

  return newValues;
}

function doFormatServiceCategoryFormValues(values, serviceCategories) {
  let newValues = values;
  let categoriesArray = [];
  serviceCategories.forEach((item) => {
    if (values[item.name]) {
      categoriesArray.push({
        id: item.id,
        description: values[item.details],
      });
    }
    delete newValues[item.name];
    delete newValues[item.details];
  });

  newValues.categories = categoriesArray;

  return newValues;
}

function doFormatLocationFormValues(values) {
  let newValues = values;
  if (newValues.locations) {
    newValues.locations.forEach((location) => {
      location.uprn = location.uprn.toString();
    });
  }
  return newValues;
}

function doCleanServiceFormValues(
  values,
  serviceCategories,
  serviceDemographics
) {
  let cleanFormValues = {};
  cleanFormValues = doFormatServiceDemographicFormValues(
    values,
    serviceDemographics
  );
  cleanFormValues = doFormatServiceCategoryFormValues(
    cleanFormValues,
    serviceCategories
  );
  cleanFormValues = doFormatLocationFormValues(cleanFormValues);

  return cleanFormValues;
}

function doCleanServiceImage(image) {
  let formData = new FormData();

  formData.append("image", image);

  return formData;
}

function doFormatCategoryDefaultValues(values, serviceCategories) {
  const categoryIdArray = values.categories.map((category) => {
    return category.id;
  });

  let newValues = { ...values };

  serviceCategories.forEach((item) => {
    if (categoryIdArray.includes(item.id)) {
      const categoryInfo = values.categories.filter((category) => {
        return category.id === item.id;
      });

      newValues[item.name] = true;
      newValues[item.details] = categoryInfo[0].service_description;
    }
  });

  delete newValues.categories;

  return newValues;
}

function addFormattedAddress(locationsArray) {
  locationsArray.forEach((location) => {
    location["formattedAddress"] = location.address_1.concat(
      ", ",
      location.address_2,
      ", ",
      location.city,
      ", ",
      location.postal_code
    );
  });
  return locationsArray;
}

function doFormatDemographicDefaultValues(values, serviceDemographics) {
  const demographicIdArray = values.demographics.map((demographic) => {
    return demographic.id;
  });

  let newValues = { ...values };

  if (demographicIdArray.length === serviceDemographics.length - 1) {
    newValues.everyone = true;
    delete newValues.demographics;
    return newValues;
  }

  serviceDemographics.forEach((item) => {
    const demographicId = item.id;
    const demographicName = item.name;

    if (demographicIdArray.includes(demographicId)) {
      newValues[demographicName] = true;
    }
  });

  delete newValues.demographics;

  return newValues;
}

function doCleanDefaultValues(values, serviceCategories, serviceDemographics) {
  let cleanDefaultValues = {};
  cleanDefaultValues = doFormatCategoryDefaultValues(values, serviceCategories);
  cleanDefaultValues = doFormatDemographicDefaultValues(
    cleanDefaultValues,
    serviceDemographics
  );

  return cleanDefaultValues;
}

function doHandleHiddenFieldVisibility(
  cleanDefaultValues,
  showHiddenField,
  setShowHiddenField,
  serviceCategories
) {
  serviceCategories.forEach((category) => {
    if (cleanDefaultValues[category.name]) {
      showHiddenField[category.details] = true;
    }
  });

  setShowHiddenField(showHiddenField);
}

function generateInitialShowHiddenField(serviceCategories) {
  let initialShowHiddenField = {};

  // loop through each service category, and set show to false for each of the additional information ('details') fields
  serviceCategories.forEach((category) => {
    initialShowHiddenField[category.details] = false;
  });

  return initialShowHiddenField;
}

function formatServiceCategories(serviceCategories) {
  const formattedServiceCategories = serviceCategories.map((category) => {
    category.name = camelCase(category.label).concat(category.id);
    category.details = category.name.concat("Details");
    return category;
  });
  return formattedServiceCategories;
}

function formatServiceDemographics({
  serviceDemographics,
  addEveryoneTerm = true,
}) {
  let formattedServiceDemographics = serviceDemographics.map((demographic) => {
    demographic.name = camelCase(demographic.label).concat(demographic.id);
    return demographic;
  });

  if (addEveryoneTerm) {
    formattedServiceDemographics.unshift({
      id: 999,
      label: "Everyone",
      name: "everyone",
    });
  }

  return formattedServiceDemographics;
}

export {
  doCleanServiceFormValues,
  addFormattedAddress,
  doCleanServiceImage,
  doFormatCategoryDefaultValues,
  doFormatDemographicDefaultValues,
  doCleanDefaultValues,
  doHandleHiddenFieldVisibility,
  generateInitialShowHiddenField,
  formatServiceCategories,
  formatServiceDemographics,
};
