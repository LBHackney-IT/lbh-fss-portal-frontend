import { uniq } from "lodash";

function convertBooleanToYesNo(value) {
  if (value === null) return null;
  return value ? "yes" : "no";
}

function convertYesNoToBoolean(value) {
  if (value === null) return null;
  return value.toLowerCase() === "yes" ? true : false;
}

function getPreviousYears(numberOfYears) {
  const currentYear = new Date().getFullYear();

  const yearRange = Array.from(
    { length: numberOfYears },
    (v, k) => k + currentYear - (numberOfYears - 1)
  );

  return yearRange.reverse();
}

function convertStepNumToWord(stepNum) {
  const words = ["One", "Two", "Three", "Four", "Five"];
  return words[stepNum];
}

function arrayOfObjhasDuplicates(arrayOfObj) {
  const arrayOfObjCopy = [...arrayOfObj];
  Object.keys(arrayOfObjCopy).forEach((key) => {
    arrayOfObjCopy[key] = JSON.stringify(arrayOfObjCopy[key]);
  });

  return uniq(arrayOfObjCopy).length != arrayOfObjCopy.length;
}

function removeEmptyObjFromArrayObj(array) {
  let cleanArray = [];
  array.forEach((item) => {
    if (Object.keys(item) != 0) {
      cleanArray.push(item);
    }
  });

  return cleanArray;
}

function objAllFalse(obj) {
  return Object.keys(obj).every((k) => !obj[k]);
}

function objAllTrue(obj) {
  return Object.keys(obj).every((k) => obj[k]);
}

function addFormattedAddress(locationsArray) {
  locationsArray.forEach((location) => {
    location["formattedAddress"] = location.address1.concat(
      ", ",
      location.address2,
      ", ",
      location.city,
      ", ",
      location.postalCode
    );
  });
  return locationsArray;
}

function snakeToCamel(str) {
  return str.replace(/([-_][a-z])/g, (group) =>
    group.toUpperCase().replace("-", "").replace("_", "")
  );
}

function snakeToCamelKeys(obj) {
  const newObj = {};

  Object.keys(obj).forEach((key) => {
    newObj[snakeToCamel(key)] = obj[key];
  });

  return newObj;
}

export {
  convertBooleanToYesNo,
  convertYesNoToBoolean,
  getPreviousYears,
  convertStepNumToWord,
  arrayOfObjhasDuplicates,
  removeEmptyObjFromArrayObj,
  objAllFalse,
  objAllTrue,
  addFormattedAddress,
  snakeToCamelKeys,
};
