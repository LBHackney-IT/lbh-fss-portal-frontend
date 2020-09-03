import React from "react";
import { useForm } from "react-hook-form";
import FormFieldset from "../../../../components/FormFieldset/FormFieldset";
import FormRadio from "../../../../components/FormRadio/FormRadio";
import Button from "../../../../components/Button/Button";

const OrganisationConfirmLocationForm = ({ onSubmit, defaultValues = {} }) => {
  const { register, handleSubmit, errors } = useForm({
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormFieldset label="Roles">
        {["Yes", "No"].map((item) => {
          return (
            <FormRadio
              key={item}
              name="isHackneyBased"
              label={item}
              value={item.toLowerCase()}
              register={register}
            />
          );
        })}
      </FormFieldset>
      <Button type="submit" label="Continue ›" />
    </form>
  );
};

export default OrganisationConfirmLocationForm;
