import React, { useEffect, useState } from "react";
import AppLoading from "../../../AppLoading";
import TaxonomiesService from "../../../services/TaxonomiesService/TaxonomiesService";
import { toast } from "react-toastify";
import { navigate } from "@reach/router";
import TaxonomyForm from "../TaxonomyForm/TaxonomyForm";

const EditTaxonomy = ({ vocabularyName, vocabularyId, termId }) => {
  const [isLoading, setIsLoading] = useState(true);

  const [taxonomyTerm, setTaxonomyTerm] = useState({});

  useEffect(() => {
    async function fetchTaxonomyTerm() {
      const retrievedTaxonomyTerm = await TaxonomiesService.getTaxonomyTerm(
        termId
      );

      if (retrievedTaxonomyTerm) {
        setTaxonomyTerm(retrievedTaxonomyTerm);
      } else {
        toast.error("Could not retrieve taxonomy term.");
        navigate("/taxonomies");
      }

      setIsLoading(false);
    }

    fetchTaxonomyTerm();
  }, []);

  async function doEditTaxonomyTerm(values) {
    values.label = values.label;
    values.vocabulary_id = vocabularyId;
    values.weight = parseInt(values.weight);

    // why is this delete here?
    // delete values.label;

    setIsLoading(true);

    const termSuccessfullyAdded = await TaxonomiesService.updateTaxonomyTerm(
      termId,
      values
    );

    setIsLoading(false);

    if (termSuccessfullyAdded) {
      toast.success(`Successfully updated '${values.name}' taxonomy term.`);
      navigate("/taxonomies");
    } else {
      toast.error(`Failed to update '${values.name}' taxonomy term.`);
    }
  }

  if (isLoading) {
    return <AppLoading />;
  }

  return (
    <TaxonomyForm
      onSubmit={doEditTaxonomyTerm}
      vocabularyName={vocabularyName}
      defaultValues={taxonomyTerm}
    />
  );
};

export default EditTaxonomy;
