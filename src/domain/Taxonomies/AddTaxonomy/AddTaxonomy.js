import React, { useState } from "react";
import FormInput from "../../../components/FormInput/FormInput";
import Button from "../../../components/Button/Button";
import FormHelpText from "../../../components/FormHelpText/FormHelpText";
import { useForm } from "react-hook-form";
import AppLoading from "../../../AppLoading";
import RaisedCard from "../../../components/RaisedCard/RaisedCard";
import { navigate } from "@reach/router";
import { toast } from "react-toastify";
import TaxonomiesService from "../../../services/TaxonomiesService/TaxonomiesService";

const AddTaxonomy = ({ vocabularyName, vocabularyId }) => {
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, errors } = useForm();

  function doAddTaxonomyTerm(values) {
    values.vocabulary_id = vocabularyId;
    values.weight = 1;

    setIsLoading(true);

    const termSuccessfullyAdded = TaxonomiesService.createTaxonomyTerm(values);

    setIsLoading(false);

    if (termSuccessfullyAdded) {
      toast.success(`Successfully added '${values.label}' taxonomy term.`);
      navigate("/taxonomies");
    } else {
      toast.error(`Failed to add '${values.label}' taxonomy term.`);
    }
  }

  if (isLoading) {
    return <AppLoading />;
  }

  return (
    <RaisedCard>
      <h1 style={{ margin: "20px 0 30px 0" }}>Taxonomy: {vocabularyName}</h1>

      <form onSubmit={handleSubmit(doAddTaxonomyTerm)}>
        <FormInput
          name="label"
          label={`Label`}
          register={register}
          error={errors.label}
          required
          maxLength={255}
        />

        <FormInput
          name="description"
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

export default AddTaxonomy;
