import React, { useState } from "react";
import styled from "styled-components";
import Button from "../../../../components/Button/Button";
import { useForm } from "react-hook-form";
import AppLoading from "../../../../AppLoading";
import useAllOrganisationFetch from "../../../../hooks/useAllOrganisationFetch/useAllOrganisationFetch";
import autocomplete from "autocompleter";
import "./OrganisationForm.css";
import FormError from "../../../../components/FormError/FormError";

const StyledOrganisationAutocomplete = styled.input`
  background: white;
  z-index: 1000;
  overflow: auto;
  box-sizing: border-box;
  border: 1px solid rgba(50, 50, 50, 0.6);
  padding: 10px;
  width: 100%;
  max-width: 438px;
`;

const ServiceOrganisationForm = ({
  onSubmit,
  defaultValues = {},
  submitLoading = false,
  goBackToPreviousStep,
}) => {
  // fetch all organisations
  const { organisations, organisationsIsLoading } = useAllOrganisationFetch();

  const [organisationFieldValue, setOrganisationFieldValue] = useState(
    defaultValues.organisation_name ? defaultValues.organisation_name : ""
  );
  const [organisationNotFound, setOrganisationNotFound] = useState(false);

  console.log("defaultValues");
  console.log(defaultValues);

  const { handleSubmit } = useForm({
    defaultValues,
  });

  if (organisations && document.getElementById("organisations")) {
    organisations.forEach((organisation) => {
      organisation.label = organisation.name;
      organisation.value = organisation.id;
    });

    autocomplete({
      minLength: 1,
      input: document.getElementById("organisations"),
      fetch: function (text, update) {
        text = text.toLowerCase();

        var suggestions = organisations.filter((n) =>
          n.label.toLowerCase().startsWith(text)
        );

        console.log(suggestions);

        update(suggestions);
      },
      onSelect: function (item) {
        setOrganisationFieldValue(item.label);
        document.querySelectorAll(".autocomplete").forEach((element) => {
          element.style.display = "none";
        });
      },
    });
  }

  if (submitLoading || organisationsIsLoading) {
    return <AppLoading />;
  }

  return (
    <form
      onSubmit={handleSubmit(() => {
        const organisationToLink = organisations.filter(
          (organisation) => organisation.name === organisationFieldValue
        )[0];

        if (organisationToLink) {
          setOrganisationNotFound(false);

          onSubmit({
            organisation_id: organisationToLink.id,
            organisation_name: organisationToLink.label,
          });
        } else {
          setOrganisationNotFound(true);
        }
      })}
    >
      <div style={{ marginBottom: "30px" }}>
        <h3>Link to organisation</h3>
        <StyledOrganisationAutocomplete
          id="organisations"
          type="text"
          onChange={(e) => {
            setOrganisationNotFound(false);
            setOrganisationFieldValue(e.target.value);
          }}
          value={organisationFieldValue}
        />
        {organisationNotFound ? (
          <FormError
            error={`Organisation '${organisationFieldValue}' not found`}
            marginTop={"10px"}
          />
        ) : null}
      </div>
      <Button
        type="submit"
        label="Continue"
        disabled={submitLoading}
        padding="15px"
        margin="0 0 20px 0"
      />
    </form>
  );
};

export default ServiceOrganisationForm;
