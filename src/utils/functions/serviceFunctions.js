function doFormatServiceDemographicFormValues(
  values,
  serviceDemographicCheckboxOptions
) {
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

function doFormatServiceCategoryFormValues(
  values,
  serviceCategoryCheckboxOptions
) {
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
function doConvertServiceFormValuesIntoFormData(values) {
  let formData = new FormData();

  Object.keys(values).forEach((key) => {
    formData.append(key, values[key]);
  });

  return formData;
}

function doCleanServiceFormValues(
  values,
  serviceCategoryCheckboxOptions,
  serviceDemographicCheckboxOptions
) {
  let cleanFormValues = {};
  cleanFormValues = doFormatServiceDemographicFormValues(
    values,
    serviceDemographicCheckboxOptions
  );
  cleanFormValues = doFormatServiceCategoryFormValues(
    cleanFormValues,
    serviceCategoryCheckboxOptions
  );
  
  cleanFormValues = doConvertServiceFormValuesIntoFormData(cleanFormValues);

  return cleanFormValues;
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

export { doCleanServiceFormValues, addFormattedAddress };
