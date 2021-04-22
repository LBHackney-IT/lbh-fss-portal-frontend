import React, { useState } from "react";
import AppLoading from "../../../AppLoading";
import { navigate } from "@reach/router";
import { toast } from "react-toastify";
import TaxonomiesService from "../../../services/TaxonomiesService/TaxonomiesService";
import TaxonomyForm from "../TaxonomyForm/TaxonomyForm";

const AddTaxonomy = ({ vocabularyName, vocabularyId }) => {
  const [isLoading, setIsLoading] = useState(false);

  async function doAddTaxonomyTerm(values) {
    values.label = values.label;
    values.vocabulary_id = parseInt(vocabularyId);
    values.weight = parseInt(values.weight);

    // why is this delete here?
    // delete values.label;

    setIsLoading(true);

    const termSuccessfullyAdded = await TaxonomiesService.createTaxonomyTerm(
      values
    );

    setIsLoading(false);

    if (termSuccessfullyAdded) {
      toast.success(`Successfully added '${values.name}' taxonomy term.`);
    } else {
      toast.error(`Failed to add '${values.name}' taxonomy term.`);
    }

    navigate("/taxonomies");
  }

  if (isLoading) {
    return <AppLoading />;
  }

  return (
    <TaxonomyForm
      onSubmit={doAddTaxonomyTerm}
      vocabularyName={vocabularyName}
    />
  );
};

export default AddTaxonomy;
