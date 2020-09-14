import React from "react";
import FormFieldset from "../../../../components/FormFieldset/FormFieldset";
import Button from "../../../../components/Button/Button";
import { useForm } from "react-hook-form";

const ServiceDemographicsForm = ({
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
      <FormFieldset label="Who you work with">
        <p>
          Select the following filters if your service is for a specific
          audience.
        </p>
        <p>
          This will help make it easier for residents to help find your service.
        </p>
      </FormFieldset>
      <FormFieldset label="Search keywords">
        <p>
          Include one or more keywords that describe your service. These
          keywords make search results more accurate. Separate keywords with a
          comma.
        </p>
      </FormFieldset>
      <Button type="submit" label="Continue ›" />
    </form>
  );
};

export default ServiceDemographicsForm;
