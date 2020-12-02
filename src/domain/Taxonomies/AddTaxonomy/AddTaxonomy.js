import React, { useEffect, useState } from "react";
import FormInput from "../../../components/FormInput/FormInput";
import Button from "../../../components/Button/Button";
import FormHelpText from "../../../components/FormHelpText/FormHelpText";
import { red } from "../../../settings/colors";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import AppLoading from "../../../AppLoading";
import RaisedCard from "../../../components/RaisedCard/RaisedCard";
import { giveUserFeedback } from "../../../utils/functions/taxonomyFunctions";

function formatVocabulary(taxonomy) {
  const TaxonomyName = taxonomy.replace(/-/g, " ");
  return TaxonomyName.charAt(0).toUpperCase() + TaxonomyName.slice(1);
}

const AddTaxonomy = ({ vocabularyName, vocabularyId }) => {
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, errors, getValues } = useForm();

  const formattedVocabulary = formatVocabulary(vocabularyName);

  function doAddTaxonomyTerm(values) {
    setIsLoading(true);

    // make call to POST /taxonomies
    // const termSuccessfullyAdded = false;
    const termSuccessfullyAdded = [];

    setIsLoading(false);

    giveUserFeedback({
      term: values.label,
      updateStatus: termSuccessfullyAdded,
      action: "add",
    });
  }

  if (isLoading) {
    return (
      <>
        <AppLoading />
      </>
    );
  }

  return (
    <RaisedCard>
      <h1 style={{ margin: "20px 0 30px 0" }}>
        Taxonomy: {formattedVocabulary}
      </h1>

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
          name="description_short"
          label={`Description`}
          register={register}
          error={errors.description_short}
          required
          maxLength={255}
        />
        <FormHelpText helpText="A short description of the taxonomy term" />

        <Button
          buttonStyle={{ margin: "40px 0" }}
          type="submit"
          label={"Save"}
        />
      </form>
    </RaisedCard>
  );

  //   return (
  //     <>
  //       <h2>{taxonomyName}</h2>
  //       <form onSubmit={handleSubmit(editTerm)}>
  //         <FormInput
  //           name="term"
  //           label={`Add term to ${taxonomyName.toLowerCase()} taxonomy`}
  //           register={register}
  //           error={errors.demographic}
  //           required
  //           maxLength={255}
  //         />
  //         <Button type="submit" label={"Submit"} />
  //       </form>
  //     </>
  //   );
};

export default AddTaxonomy;
