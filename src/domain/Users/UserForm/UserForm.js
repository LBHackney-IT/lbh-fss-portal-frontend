import React, { useState } from "react";
import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import Input from "../../../components/Input/Input";
import Button from "../../../components/Button/Button";
import StatusMessage from "../../../components/StatusMessage/StatusMessage";

const UserForm = ({
  onSubmit,
  defaultValues = {},
  submitLabel = "Save",
  submitDisabled = false,
  errorMessage = false,
}) => {
  const { register, handleSubmit, errors } = useForm({ defaultValues });

  return (
    <>
      {errorMessage ? (
        <StatusMessage type="error" message={errorMessage} />
      ) : (
        ""
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          name="name"
          type="name"
          register={register}
          error={errors.name}
          required
        />
        <Input
          name="email"
          type="email"
          register={register}
          error={errors.email}
          required
        />

        <Button type="submit" label={submitLabel} disabled={submitDisabled} />
      </form>
    </>
  );
};

UserForm.propTypes = {
  onSubmit: PropTypes.func,
  submitLabel: PropTypes.string,
};

export default UserForm;
