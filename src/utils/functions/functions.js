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

export {
  convertBooleanToYesNo,
  convertYesNoToBoolean,
  getPreviousYears,
  convertStepNumToWord,
  arrayOfObjhasDuplicates,
};
