import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import FormCheckbox from "../../../../components/FormCheckbox/FormCheckbox";
import FormFieldset from "../../../../components/FormFieldset/FormFieldset";
import Button from "../../../../components/Button/Button";
import FormInput from "../../../../components/FormInput/FormInput";
import { breakpoint } from "../../../../utils/breakpoint/breakpoint";
import { Link } from "@reach/router";

const StyledSubTextContainer = styled.div`
  margin: -15px 0 15px 50px;
  font-size: 15px;
  ${breakpoint("sm")`
    margin: -30px 0 15px 50px;
  `};
`;

const StyledSubText = styled.p`
  margin: 5px 0;
`;

const StyledExternalLink = styled.a`
  display: block;
  margin: 5px 0;
`;

const StyledHiddenFieldContainer = styled.div`
  margin-bottom: 50px;
`;

const OrganisationCharityInformationForm = ({
  defaultValues,
  onSubmit,
  showHiddenField,
  setShowHiddenField,
  setShowHiddenFieldSnapshot,
  goBackToPreviousStep,
}) => {
  const { register, handleSubmit, errors, getValues } = useForm({
    defaultValues,
    shouldFocusError: false,
  });

  useEffect(() => {
    setShowHiddenFieldSnapshot(showHiddenField);
  }, []);

  const pageQuestionNames = [
    "is_registered_charity",
    "charity_number",
    "is_registered_community_interest_company",
    "community_interest_company_number",
    "has_hc_or_col_grant",
    "has_hcvs_or_hg_or_ael_grant",
    "is_tra_registered",
    "rsl_or_ha_association",
    "is_lottery_funded",
    "lottery_funded_project",
    "is_local_offer_listed",
    "local_offer_link",
    "funding_other",
  ];

  function handleHiddenField(id) {
    switch (id) {
      case "is_registered_charity":
        setShowHiddenField({
          ...showHiddenField,
          charity_number: !showHiddenField.charity_number,
        });
        break;
      case "is_registered_community_interest_company":
          setShowHiddenField({
            ...showHiddenField,
            community_interest_company_number: !showHiddenField.community_interest_company_number,
          });
          break;
      case "is_tra_registered":
        setShowHiddenField({
          ...showHiddenField,
          RslOrHaAssociation: !showHiddenField.RslOrHaAssociation,
        });
        break;
      case "is_lottery_funded":
        setShowHiddenField({
          ...showHiddenField,
          lottery_funded_project: !showHiddenField.lottery_funded_project,
        });
        break;
      case "is_local_offer_listed":
        setShowHiddenField({
          ...showHiddenField,
          local_offer_link: !showHiddenField.local_offer_link,
        });
        break;
      default:
        return false;
    }
  }

  const checkboxOptions = [
    {
      id: "is_registered_charity",
      label: "Registered Charity",
    },
    {
      id: "is_registered_community_interest_company",
      label: "Registered Community Interest Company",
    },
    {
      id: "has_hc_or_col_grant",
      label: "Received a grant from Hackney Council or City of London",
    },
    {
      id: "has_hcvs_or_hg_or_ael_grant",
      label:
        "Received a grant from Hackney CVS, Hackney Giving or AgeUK East London grants database",
    },
    {
      id: "is_tra_registered",
      label: "Registered with the Tenant and Resident Association",
    },
    {
      id: "is_lottery_funded",
      label:
        "Received a grant from a Lottery Funded project? E.g. National Lottery or Sports England",
    },
    {
      id: "is_local_offer_listed",
      label: "Are you on the Local Offer?",
    },
  ];

  return (
    <form
      onSubmit={handleSubmit(() => onSubmit(getValues(), pageQuestionNames))}
    >
      <FormFieldset
        label="Please confirm you are at least one of the following:"
        marginBottom={"0"}
      >
        {checkboxOptions.map((item) => {
          return (
            <div key={item.id}>
              <FormCheckbox
                name={item.id}
                label={item.label}
                value={item.label}
                register={register}
                onClick={() => handleHiddenField(item.id)}
              />
              {item.id === "is_local_offer_listed" ? (
                <StyledSubTextContainer>
                  <StyledSubText>
                    If you provide a SEND (special educational needs and
                    disabilites) service we recomend you sign up for the:
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
              ) : null}

              {showHiddenField.charity_number &&
              item.id === "is_registered_charity" ? (
                <StyledHiddenFieldContainer>
                  <StyledExternalLink
                    href="https://www.gov.uk/find-charity-information"
                    target="_blank"
                    rel="noreffer noopener"
                  >
                    Look up your charity number
                  </StyledExternalLink>
                  <FormInput
                    label={"What is your charity number?"}
                    name={"charity_number"}
                    register={register}
                  />
                </StyledHiddenFieldContainer>
              ) : null}

{/* Ns start of change. */}

{showHiddenField.community_interest_company_number &&
              item.id === "is_registered_community_interest_company" ? (
                <StyledHiddenFieldContainer>
                  <StyledExternalLink
                    href="https://find-and-update.company-information.service.gov.uk/"
                    target="_blank"
                    rel="noreffer noopener"
                  >
                    Look up your company number
                  </StyledExternalLink>
                  <FormInput
                    label={"What is your company number?"}
                    name={"community_interest_company_number"}
                    register={register}
                  />
                </StyledHiddenFieldContainer>
              ) : null}

{/* Ns end of change. */}
              
              {showHiddenField.RslOrHaAssociation &&
              item.id === "is_tra_registered" ? (
                <StyledHiddenFieldContainer>
                  <FormInput
                    label={
                      "Which Registered Social Landlord (RSL) or Housing Association are you registered with:"
                    }
                    name={"rsl_or_ha_association"}
                    register={register}
                    spellCheck={"true"}
                  />
                </StyledHiddenFieldContainer>
              ) : null}

              {showHiddenField.lottery_funded_project &&
              item.id === "is_lottery_funded" ? (
                <StyledHiddenFieldContainer>
                  <FormInput
                    label={"Please detail which Lottery Funded project"}
                    name={"lottery_funded_project"}
                    register={register}
                    spellCheck={"true"}
                  />
                </StyledHiddenFieldContainer>
              ) : null}

              {showHiddenField.local_offer_link &&
              item.id === "is_local_offer_listed" ? (
                <FormInput
                  label={"Please add weblink"}
                  name={"local_offer_link"}
                  error={errors.local_offer_link}
                  maxLength={255}
                  validate={{
                    pattern: (value) => {
                      const expression = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
                      const regex = new RegExp(expression);
                      if (value === "") return true;
                      return value.match(regex) || "Enter a valid URL";
                    },
                  }}
                  register={register}
                />
              ) : null}
            </div>
          );
        })}
      </FormFieldset>

      <FormInput
        label={"Other - how is your activity funded?"}
        name={"funding_other"}
        register={register}
        spellCheck={"true"}
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

            if (allCheckboxValuesFalse && getValues("funding_other") === "") {
              return emptyFormMessage;
            } else {
              return true;
            }
          },
        }}
        error={errors.funding_other}
      />
      <Button type="submit" label="Continue ›" margin="0 0 20px 0" />
      <Link to="/" onClick={(e) => goBackToPreviousStep(e)}>
        Go back to previous step
      </Link>
    </form>
  );
};

export default OrganisationCharityInformationForm;
