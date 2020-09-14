import React from "react";
import FormFieldset from "../../../../components/FormFieldset/FormFieldset";
import Button from "../../../../components/Button/Button";
import { useForm } from "react-hook-form";

const ServiceCategoriesForm = ({
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
      <FormFieldset label="Services you provide">
        <p>
          Please select what categories you would like your service listed
          under.
        </p>
        <p>
          Each category you select please provide a description of what it is
          your service provides
        </p>
        <ul>
          <li>Use first person, active voice (e.g. we provide...)</li>
          <li>Be concise, factual, avoid acronyms and jargon.</li>
          <li>Around 25 words (150 characters) would be great please!</li>
        </ul>
      </FormFieldset>
      <Button type="submit" label="Continue ›" />
    </form>
  );
};

export default ServiceCategoriesForm;
