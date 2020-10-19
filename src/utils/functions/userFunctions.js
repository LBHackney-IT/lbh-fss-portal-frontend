function doCleanFormValues({ user, formValues, updateRoles, setCreatedAt }) {
  let newFormValues = {};

  newFormValues.organisation_id = user.organisation
    ? user.organisation.id
    : null;

  newFormValues.status = user.status;
  newFormValues.password = formValues.password;
  newFormValues.name = formValues.name;

  if (updateRoles) {
    newFormValues.roles = formValues.roles;
  } else {
    newFormValues.roles = user.roles;
  }

  if (setCreatedAt) {
    newFormValues.created_at = new Date();
  } else {
    newFormValues.created_at = user.created_at;
  }

  if (newFormValues.password === "") {
    newFormValues.password = null;
  }

  return newFormValues;
}

export { doCleanFormValues };
