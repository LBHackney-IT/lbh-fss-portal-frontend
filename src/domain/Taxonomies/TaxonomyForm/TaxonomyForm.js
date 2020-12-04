import React from "react";
import FormInput from "../../../components/FormInput/FormInput";
import Button from "../../../components/Button/Button";
import FormHelpText from "../../../components/FormHelpText/FormHelpText";
import { useForm } from "react-hook-form";
import RaisedCard from "../../../components/RaisedCard/RaisedCard";

const TaxonomyForm = ({ onSubmit, vocabularyName, defaultValues = {} }) => {
  const { register, handleSubmit, errors } = useForm({
    defaultValues: defaultValues,
  });

  return (
    <RaisedCard>
      <h1 style={{ margin: "20px 0 30px 0" }}>Taxonomy: {vocabularyName}</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          name="label"
          label={`Label`}
          register={register}
          error={errors.label}
          required
          maxLength={255}
        />

        <FormInput
          name="description_short"
          label={`Description`}
          register={register}
          error={errors.description}
          required
          maxLength={255}
        />
        <FormHelpText helpText="A short description of the taxonomy term" />

        <Button
          buttonStyle={{ margin: "40px 0" }}
          type="submit"
          label={"Submit"}
        />
      </form>
    </RaisedCard>
  );
};

export default TaxonomyForm;
