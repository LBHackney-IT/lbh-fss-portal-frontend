import React, { useEffect, useState } from "react";
import FormInput from "../../../components/FormInput/FormInput";
import Button from "../../../components/Button/Button";
import FormHelpText from "../../../components/FormHelpText/FormHelpText";
import { useForm } from "react-hook-form";
import AppLoading from "../../../AppLoading";
import RaisedCard from "../../../components/RaisedCard/RaisedCard";
import TaxonomiesService from "../../../services/TaxonomiesService/TaxonomiesService";
import { toast } from "react-toastify";
import { navigate } from "@reach/router";

const EditTaxonomy = ({ vocabularyName, vocabularyId, termId }) => {
  const [isLoading, setIsLoading] = useState(true);

  const [taxonomyTerm, setTaxonomyTerm] = useState({
    id: 11,
    label: "Immigration advice",
    description_short: "A short description of the taxonomy item",
    description_long: "A longer description for this service",
    vocabulary: "Service categories",
    vocabulary_id: 1,
    weight: 11,
  });

  const { register, handleSubmit, errors } = useForm({
    defaultValues: taxonomyTerm,
  });

  useEffect(() => {
    async function fetchTaxonomyTerm() {
      const retrievedTaxonomyTerm = await TaxonomiesService.getTaxonomyTerm(
        vocabularyId
      );

      setIsLoading(false);

      if (retrievedTaxonomyTerm) {
        setTaxonomyTerm(retrievedTaxonomyTerm);
      } else {
        toast.error("Could not retrieve taxonomy term.");
        navigate("/taxonomies");
      }
    }

    fetchTaxonomyTerm();
  }, []);

  function doEditTaxonomyTerm(values) {
    values.name = values.label;
    values.vocabulary_id = vocabularyId;
    values.weight = 1;

    delete values.label;

    setIsLoading(true);

    const termSuccessfullyAdded = TaxonomiesService.updateTaxonomyTerm(
      vocabularyId,
      values
    );

    setIsLoading(false);

    if (termSuccessfullyAdded) {
      toast.success(`Successfully updated '${values.label}' taxonomy term.`);
      navigate("/taxonomies");
    } else {
      toast.error(`Failed to updated '${values.label}' taxonomy term.`);
    }
  }

  if (isLoading) {
    return <AppLoading />;
  }

  return (
    <RaisedCard>
      <h1 style={{ margin: "20px 0 30px 0" }}>Taxonomy: {vocabularyName}</h1>
      <form onSubmit={handleSubmit(doEditTaxonomyTerm)}>
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

export default EditTaxonomy;
