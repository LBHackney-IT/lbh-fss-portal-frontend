import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import FormError from "../FormError/FormError";

const StyledLabel = styled.label``;

const StyledRadio = styled.input``;

const FormCheckbox = ({ name, label, register, required, error, value }) => {
  return (
    <>
      <StyledLabel>
        <StyledRadio
          name={name}
          type="radio"
          ref={register({ required })}
          aria-invalid={error ? "true" : "false"}
          value={value}
        />
        {label}
      </StyledLabel>
      {error && error.message && <FormError error={error.message} />}
    </>
  );
};

FormCheckbox.propTypes = {
  name: PropTypes.string,
};

export default FormCheckbox;
