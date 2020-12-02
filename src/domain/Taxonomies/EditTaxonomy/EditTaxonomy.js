import React, { useEffect, useState } from "react";
import FormInput from "../../../components/FormInput/FormInput";
import Button from "../../../components/Button/Button";
import FormHelpText from "../../../components/FormHelpText/FormHelpText";
import { red } from "../../../settings/colors";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import AppLoading from "../../../AppLoading";
import RaisedCard from "../../../components/RaisedCard/RaisedCard";

const EditTaxonomy = ({ vocabularyName, vocabularyId, termId }) => {
  const [isLoading, setIsLoading] = useState(false);

  const [term, setTerm] = useState({
    id: 11,
    label: "Immigration advice",
    description_short: "A short description of the taxonomy item",
    description_long: "A longer description for this service",
    vocabulary: "Service categories",
    vocabulary_id: 1,
    weight: 11,
  });

  const { register, handleSubmit, errors, getValues } = useForm({
    defaultValues: term,
  });

  useEffect(() => {
    // fetch taxonomy term
  }, []);

  if (isLoading) {
    return (
      <>
        <AppLoading />
      </>
    );
  }

  return (
    <RaisedCard>
      <h1 style={{ margin: "20px 0 30px 0" }}>Taxonomy: {vocabularyName}</h1>
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

      <Button buttonStyle={{ margin: "40px 0" }} type="submit" label={"Save"} />
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

export default EditTaxonomy;
