import React from "react";
import FormFieldset from "../../../../components/FormFieldset/FormFieldset";
import Button from "../../../../components/Button/Button";
import { useForm } from "react-hook-form";

const ServiceLocationsForm = ({ onSubmit, defaultValues = {} }) => {
  const { handleSubmit } = useForm({
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormFieldset
        label="Service location(s)"
        help="This will be where your service(s) are located on the map. If you offer a remote service you get put in your HQ"
      ></FormFieldset>
      <Button type="submit" label="Continue ›" />
    </form>
  );
};

export default ServiceLocationsForm;
