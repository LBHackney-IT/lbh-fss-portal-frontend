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

export { convertBooleanToYesNo, convertYesNoToBoolean, getPreviousYears };
