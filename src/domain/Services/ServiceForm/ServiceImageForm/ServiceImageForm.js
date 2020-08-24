import React from "react";
import FormFieldset from "../../../../components/FormFieldset/FormFieldset";
import Button from "../../../../components/Button/Button";
import { useForm } from "react-hook-form";

const ServiceCategoriesForm = ({
  onSubmit,
  defaultValues = {},
  submitLoading = false,
}) => {
  const { handleSubmit } = useForm({
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormFieldset label="Service picture">
        <p>
          Upload a picture to show residents what you do. This will be displayed
          on your listing.
        </p>
      </FormFieldset>
      <Button type="submit" label="Submit service" disabled={submitLoading} />
    </form>
  );
};

export default ServiceCategoriesForm;
