import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import FormFieldset from "../../../../components/FormFieldset/FormFieldset";
import Button from "../../../../components/Button/Button";
import FormInput from "../../../../components/FormInput/FormInput";

const OrganisationName = ({
  onSubmit,
  defaultValues = {},
  showHiddenField,
  setShowHiddenField,
  setShowHiddenFieldSnapshot,
}) => {
  const { register, handleSubmit, errors, getValues } = useForm({
    defaultValues,
  });

  useEffect(() => {
    setShowHiddenFieldSnapshot(showHiddenField);
  }, []);

  const pageQuestionNames = ["name"];

  return (
    <form
      onSubmit={handleSubmit(() => onSubmit(getValues(), pageQuestionNames))}
    >
      <FormFieldset
        label="What is the name of your organisation?"
        marginBottom="10px"
        legendStyle={{ marginBottom: "20px" }}
      >
        <FormInput
          label={""}
          name={"name"}
          register={register}
          spellCheck={"true"}
          validate={{
            pattern: (value) => {
              return value.trim() !== "" || "Organisation name is required";
            },
          }}
          error={errors.name}
        />
      </FormFieldset>
      <Button type="submit" label="Continue ›" />
    </form>
  );
};

export default OrganisationName;
