import React from "react";
import PropTypes from "prop-types";

const FormCheckbox = ({ name, label, register, required, error, value }) => {
  return (
    <>
      <label>
        <input
          name={name}
          type="checkbox"
          ref={register({ required })}
          aria-invalid={error ? "true" : "false"}
          value={value}
        />
        {label}
      </label>
      {error && error.type === "required" && (
        <span role="alert">This is required</span>
      )}
    </>
  );
};

FormCheckbox.propTypes = {
  name: PropTypes.string,
};

export default FormCheckbox;
