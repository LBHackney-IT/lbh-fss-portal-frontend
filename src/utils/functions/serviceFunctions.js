function doFormatServiceDemographicFormValues(
  values,
  serviceDemographics
) {
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

function doFormatServiceCategoryFormValues(
  values,
  serviceCategories
) {
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

export { doCleanServiceFormValues, addFormattedAddress, doCleanServiceImage };
