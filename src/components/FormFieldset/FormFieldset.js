import React from "react";

const FormFieldset = ({ label, children }) => {
  return (
    <fieldset>
      <legend>{label}</legend>
      <div>{children}</div>
    </fieldset>
  );
};

export default FormFieldset;
