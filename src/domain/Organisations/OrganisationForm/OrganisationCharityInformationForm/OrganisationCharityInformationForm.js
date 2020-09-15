import React from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import FormCheckbox from "../../../../components/FormCheckbox/FormCheckbox";
import FormFieldset from "../../../../components/FormFieldset/FormFieldset";
import Button from "../../../../components/Button/Button";
import FormInput from "../../../../components/FormInput/FormInput";

const StyledSubTextContainer = styled.div`
  margin-left: 15px;
`;

const StyledSubText = styled.p`
  margin: 0;
`;

const OrganisationCharityInformationForm = ({ defaultValues, onSubmit }) => {
  const { register, handleSubmit, errors, getValues } = useForm({
    defaultValues,
    shouldFocusError: false,
  });

  const checkboxOptions = [
    {
      id: "registered-charity",
      label: "Registered Charity",
    },
    {
      id: "recieved-with-option-1",
      label: "Received a grant from Hackney Council or City of London",
    },
    {
      id: "recieved-with-option-2",
      label:
        "Received a grant from Hackney CVS, Hackney Giving or AgeUK East London grants database",
    },
    {
      id: "registered-with-tenant",
      label: "Registered with the Tenant and Resident Association",
    },
    {
      id: "registered-with-lottery",
      label:
        "Received a grant from a Lottery Funded project? E.g. National Lottery or Sports England",
    },
    {
      id: "local-offer",
      label: "Are you on the Local Offer?",
    },
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormFieldset
        label="Please confirm you are at least one of the following:"
        marginBottom={"0"}
      >
        {checkboxOptions.map((item) => {
          return (
            <FormCheckbox
              key={item.id}
              name={item.id}
              label={item.label}
              value={item.label}
              register={register}
            />
          );
        })}
      </FormFieldset>
      <StyledSubTextContainer>
        <StyledSubText>
          If you provide a SEND (special educational needs and disabilites)
          service we recomend you sign up for the:
        </StyledSubText>
        <StyledSubText>
          <a href="mailto:localoffer@hackney.gov.uk">
            localoffer@hackney.gov.uk
          </a>
        </StyledSubText>
        <StyledSubText>
          <a href="mailto:EEYService@cityoflondon.gov.uk">
            EEYService@cityoflondon.gov.uk
          </a>
        </StyledSubText>
      </StyledSubTextContainer>
      <FormInput
        label={"Other - how is your activity funded? "}
        name="other"
        register={register}
        validate={{
          notEmpty: () => {
            const emptyFormMessage =
              "Please confirm at least one of the above or provide further information";

            const allValues = getValues();
            const checkboxIds = [];
            const checkboxValues = [];

            checkboxOptions.forEach((option) => {
              checkboxIds.push(option.id);
            });

            Object.keys(allValues).forEach((key) => {
              if (checkboxIds.includes(key)) {
                checkboxValues.push(allValues[key]);
              }
            });

            const allCheckboxValuesFalse = checkboxValues.every(
              (value) => !value
            );

            if (allCheckboxValuesFalse && getValues("other") === "") {
              return emptyFormMessage;
            } else {
              return false;
            }
          },
        }}
        error={errors.other}
      />
      <Button type="submit" label="Continue ›" />
    </form>
  );
};

export default OrganisationCharityInformationForm;
