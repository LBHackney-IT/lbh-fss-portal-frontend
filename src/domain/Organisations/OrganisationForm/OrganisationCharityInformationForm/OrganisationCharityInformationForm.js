import React, { useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import FormCheckbox from "../../../../components/FormCheckbox/FormCheckbox";
import FormFieldset from "../../../../components/FormFieldset/FormFieldset";
import Button from "../../../../components/Button/Button";
import FormInput from "../../../../components/FormInput/FormInput";
import { breakpoint } from "../../../../utils/breakpoint/breakpoint";

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

const OrganisationCharityInformationForm = ({ defaultValues, onSubmit }) => {
  const { register, handleSubmit, errors, getValues } = useForm({
    defaultValues,
    shouldFocusError: false,
  });

  const [showCharityNumber, setShowCharityNumber] = useState(false);
  const [showRSLOrHaAssociation, setShowRSLOrHaAssociation] = useState(false);
  const [showLotteryFundedProject, setShowLotteryFundedProject] = useState(
    false
  );
  const [showLocalOfferLink, setShowLocalOfferLink] = useState(false);

  function handleHiddenField(id) {
    switch (id) {
      case "isRegisteredCharity":
        setShowCharityNumber(!showCharityNumber);
        break;
      case "isTraRegistered":
        setShowRSLOrHaAssociation(!showRSLOrHaAssociation);
        break;
      case "isLotteryFunded":
        setShowLotteryFundedProject(!showLotteryFundedProject);
        break;
      case "isLocalOfferListed":
        setShowLocalOfferLink(!showLocalOfferLink);
        break;
      default:
        return false;
    }
  }

  const checkboxOptions = [
    {
      id: "isRegisteredCharity",
      label: "Registered Charity",
    },
    {
      id: "hasHcOrColGrant",
      label: "Received a grant from Hackney Council or City of London",
    },
    {
      id: "hasHcvsOrHgOrAelGrant",
      label:
        "Received a grant from Hackney CVS, Hackney Giving or AgeUK East London grants database",
    },
    {
      id: "isTraRegistered",
      label: "Registered with the Tenant and Resident Association",
    },
    {
      id: "isLotteryFunded",
      label:
        "Received a grant from a Lottery Funded project? E.g. National Lottery or Sports England",
    },
    {
      id: "isLocalOfferListed",
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
            <div key={item.id}>
              <FormCheckbox
                name={item.id}
                label={item.label}
                value={item.label}
                register={register}
                onClick={() => handleHiddenField(item.id)}
              />
              {item.id === "isLocalOfferListed" ? (
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

              {showCharityNumber && item.id === "isRegisteredCharity" ? (
                <StyledHiddenFieldContainer>
                  <StyledExternalLink href="">
                    Look up your charity number
                  </StyledExternalLink>
                  <FormInput
                    label={"What is your charity number"}
                    name={"charityNumber"}
                    register={register}
                  />
                </StyledHiddenFieldContainer>
              ) : null}

              {showRSLOrHaAssociation && item.id === "isTraRegistered" ? (
                <StyledHiddenFieldContainer>
                  <FormInput
                    label={
                      "Which Registered Social Landlord (RSL) or Housing Association are you registered with:"
                    }
                    name={"rslOrHaAssociation"}
                    register={register}
                  />
                </StyledHiddenFieldContainer>
              ) : null}

              {showLotteryFundedProject && item.id === "isLotteryFunded" ? (
                <StyledHiddenFieldContainer>
                  <FormInput
                    label={"Please detail which Lottery Funded project"}
                    name={"lotteryFundedProject"}
                    register={register}
                  />
                </StyledHiddenFieldContainer>
              ) : null}

              {showLocalOfferLink && item.id === "isLocalOfferListed" ? (
                <FormInput
                  label={"Please add weblink"}
                  name={"localOfferLink"}
                  register={register}
                />
              ) : null}
            </div>
          );
        })}
      </FormFieldset>

      <FormInput
        label={"Other - how is your activity funded?"}
        name={"fundingOther"}
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

            if (allCheckboxValuesFalse && getValues("fundingOther") === "") {
              return emptyFormMessage;
            } else {
              return true;
            }
          },
        }}
        error={errors.fundingOther}
      />
      <Button type="submit" label="Continue ›" />
    </form>
  );
};

export default OrganisationCharityInformationForm;
