import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Button from "../../../../components/Button/Button";
import { useForm } from "react-hook-form";
import AppLoading from "../../../../AppLoading";
import useAllOrganisationFetch from "../../../../hooks/useAllOrganisationFetch/useAllOrganisationFetch";
import autocomplete from "autocompleter";
import "./OrganisationForm.css";
import FormError from "../../../../components/FormError/FormError";
import { formatLabel } from "../../../../utils/functions/serviceFunctions";

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
}) => {
  // fetch all organisations
  const {
    organisations,
    setOrganisations,
    organisationsIsLoading,
  } = useAllOrganisationFetch();

  const [organisationFieldLabel, setOrganisationFieldLabel] = useState(
    formatLabel(defaultValues.organisation_name, defaultValues.organisation_id)
  );

  const [organisationNotFound, setOrganisationNotFound] = useState(false);

  const { handleSubmit } = useForm({
    defaultValues,
  });

  useEffect(() => {
    if (organisations.length === 0) return;

    // add organisation label field if not already available
    if (!organisations.hasOwnProperty("label")) {
      organisations.forEach((organisation) => {
        organisation.label = formatLabel(organisation.name, organisation.id);
        organisation.value = organisation.id;
      });
      setOrganisations(organisations);
    }
  }, [organisations, setOrganisations]);

  if (organisations && document.getElementById("organisations")) {
    autocomplete({
      minLength: 1,
      input: document.getElementById("organisations"),
      fetch: function (text, update) {
        text = text.toLowerCase();

        var suggestions = organisations.filter((n) =>
          n.label.toLowerCase().startsWith(text)
        );

        update(suggestions);
      },
      onSelect: function (item) {
        setOrganisationFieldLabel(item.label);
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
          (organisation) => organisation.label === organisationFieldLabel
        );

        if (organisationToLink.length === 1) {
          setOrganisationNotFound(false);

          onSubmit({
            organisation_id: organisationToLink[0].id,
            organisation_name: organisationToLink[0].name,
          });
        }

        setOrganisationNotFound(true);
      })}
    >
      <div style={{ marginBottom: "20px" }}>
        <h3>Organisation</h3>
        <StyledOrganisationAutocomplete
          id="organisations"
          type="text"
          onChange={(e) => {
            setOrganisationNotFound(false);
            const targetValue = e.target.value;
            setOrganisationFieldLabel(targetValue);
          }}
          value={organisationFieldLabel}
        />
        {organisationNotFound ? (
          <FormError
            error={`Organisation '${organisationFieldLabel}' not found`}
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
