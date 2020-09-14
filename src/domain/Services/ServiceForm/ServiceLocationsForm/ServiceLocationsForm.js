import React from "react";
import FormFieldset from "../../../../components/FormFieldset/FormFieldset";
import Button from "../../../../components/Button/Button";
import { useForm } from "react-hook-form";

const ServiceLocationsForm = ({
  onSubmit,
  defaultValues = {},
  formRef,
  setValidationPass,
}) => {
  const { handleSubmit } = useForm({
    defaultValues,
  });

  setValidationPass(false);

  return (
    <form onSubmit={handleSubmit(onSubmit)} ref={formRef}>
      <FormFieldset
        label="Service location(s)"
        help="This will be where your service(s) are located on the map. If you offer a remote service you get put in your HQ"
      ></FormFieldset>
      <Button type="submit" label="Continue ›" />
    </form>
  );
};

export default ServiceLocationsForm;
