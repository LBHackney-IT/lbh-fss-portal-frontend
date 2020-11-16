import { uniq } from "lodash";

function convertBooleanToYesNo(value) {
  if (value === null) return null;
  return value ? "yes" : "no";
}

function convertYesNoToBoolean(value) {
  if (value === null) return null;
  return value.toLowerCase() === "yes" ? true : false;
}

function convertCheckboxToBoolean(value) {
  if (value === null) return null;
  return value ? true : false;
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

function calculateStepPercentage(stepNum, stepArray, isInternalTeam) {
  const totalNumStep = stepArray.filter((step) => {
    if (isInternalTeam) {
      return true;
    } else {
      return !step.internalTeamOnly;
    }
  }).length;

  return (100 * stepNum) / totalNumStep;
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

function checkIsInternalTeam(roles) {
  roles = roles.map((role) => {
    return role.toLowerCase();
  });

  let isInternalTeam = false;

  if (roles) {
    isInternalTeam = roles.includes("viewer") || roles.includes("admin");
  }

  return isInternalTeam;
}
function objAllTrue(obj) {
  return Object.keys(obj).every((k) => obj[k]);
}

function arraysEqual(a, b) {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length !== b.length) return false;

  for (var i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

export {
  convertBooleanToYesNo,
  convertYesNoToBoolean,
  convertCheckboxToBoolean,
  getPreviousYears,
  convertStepNumToWord,
  calculateStepPercentage,
  arrayOfObjhasDuplicates,
  removeEmptyObjFromArrayObj,
  objAllFalse,
  checkIsInternalTeam,
  objAllTrue,
  arraysEqual,
};
