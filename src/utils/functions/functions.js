function convertBooleanToYesNo(value) {
  if (value === null) return null;
  return value ? "yes" : "no";
}

function convertYesNoToBoolean(value) {
  if (value === null) return null;
  return value.toLowerCase() === "yes" ? true : false;
}

export { convertBooleanToYesNo, convertYesNoToBoolean };
