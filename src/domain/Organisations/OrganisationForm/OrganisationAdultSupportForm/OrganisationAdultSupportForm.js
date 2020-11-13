import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import Button from "../../../../components/Button/Button";
import FormRadio from "../../../../components/FormRadio/FormRadio";
import FormFieldset from "../../../../components/FormFieldset/FormFieldset";
import { grey } from "../../../../settings";
import FormInput from "../../../../components/FormInput/FormInput";
import FormDropDown from "../../../../components/FormDropDown/FormDropDown";
import { getPreviousYears } from "../../../../utils/functions/functions";
import FormError from "../../../../components/FormError/FormError";
import { Link } from "@reach/router";

const StyledLeadText = styled.p`
  color: ${grey[400]};
`;

const StyledRadioOptionsContainer = styled.div`
  display: flex;
`;

const StyledRadioOption = styled.div`
  display: inline;
`;

const StyledRadioOptionDiv = styled.div`
  margin-top: 10px;
  display: flex;
`;

const StyledQuestion = styled.p`
  font-size: 19px;
  font-weight: bold;
`;

const OrganisationAdultSupportForm = ({
  defaultValues,
  onSubmit,
  showHiddenField,
  setShowHiddenField,
  setShowHiddenFieldSnapshot,
  goBackToPreviousStep,
}) => {
  const { register, handleSubmit, errors, getValues } = useForm({
    defaultValues,
  });

  const pageQuestionNames = [
    "has_adult_support",
    "has_adult_safeguarding_lead",
    "adult_safeguarding_lead_first_name",
    "adult_safeguarding_lead_last_name",
    "adult_safeguarding_lead_training_month",
    "adult_safeguarding_lead_training_year",
  ];

  return (
    <form
      onSubmit={handleSubmit(() => onSubmit(getValues(), pageQuestionNames))}
    >
      <FormFieldset label="Do you provide support or activities for vulnerable adults?">
        <StyledLeadText>
          We are asking you this because there are additional safeguarding
          checks for organisations working with vulnerable adults.
          <br />
          <a
            href="https://www.gov.uk/guidance/safeguarding-duties-for-charity-trustees"
            target="_blank"
            rel="noreffer noopener"
          >
            Click here to see the statutory guidance and best practice
          </a>
        </StyledLeadText>
        <StyledRadioOptionDiv>
          {["Yes", "No"].map((item) => {
            return (
              <StyledRadioOption key={item}>
                <FormRadio
                  key={item}
                  name="has_adult_support"
                  label={item}
                  value={item.toLowerCase()}
                  register={register}
                  required
                  onClick={() => {
                    if (item === "Yes") {
                      setShowHiddenField({
                        ...showHiddenField,
                        adultSafeguardLead: true,
                        adultSafeguardLeadDetails: false,
                      });
                      defaultValues.has_adult_safeguarding_lead = null;
                    } else {
                      setShowHiddenField({
                        ...showHiddenField,
                        adultSafeguardLead: false,
                      });
                    }
                  }}
                />
              </StyledRadioOption>
            );
          })}
        </StyledRadioOptionDiv>
      </FormFieldset>
      {errors.has_adult_support &&
        errors.has_adult_support.type === "required" && (
          <FormError
            error={"Please complete this question"}
            marginTop="10px"
            marginBottom="20px"
          />
        )}

      {showHiddenField.adultSafeguardLead ? (
        <FormFieldset label="Does your organisation have an Adult’s Safeguarding Lead? ">
          <StyledRadioOptionDiv>
            {["Yes", "No"].map((item) => {
              return (
                <StyledRadioOption key={item}>
                  <FormRadio
                    key={item}
                    name="has_adult_safeguarding_lead"
                    label={item}
                    value={item.toLowerCase()}
                    register={register}
                    required
                    onClick={() =>
                      item === "Yes"
                        ? setShowHiddenField({
                            ...showHiddenField,
                            adultSafeguardLeadDetails: true,
                          })
                        : setShowHiddenField({
                            ...showHiddenField,
                            adultSafeguardLeadDetails: false,
                          })
                    }
                  />
                </StyledRadioOption>
              );
            })}
          </StyledRadioOptionDiv>
        </FormFieldset>
      ) : null}
      {errors.has_adult_safeguarding_lead &&
        errors.has_adult_safeguarding_lead.type === "required" && (
          <FormError
            error={"Please complete this question"}
            marginTop="10px"
            marginBottom="20px"
          />
        )}

      {showHiddenField.adultSafeguardLead &&
      showHiddenField.adultSafeguardLeadDetails ? (
        <>
          <p>What are your organisations Adult's safeguarding lead details?</p>

          <FormInput
            label={"First name"}
            name={"adult_safeguarding_lead_first_name"}
            register={register}
            maxLength={255}
            error={errors.adult_safeguarding_lead_first_name}
          />
          <FormInput
            label={"Last name"}
            name={"adult_safeguarding_lead_last_name"}
            register={register}
            maxLength={255}
            error={errors.adult_safeguarding_lead_last_name}
          />
          <StyledQuestion>
            Date of the designated safeguarding lead training{" "}
          </StyledQuestion>
          <div style={{ display: "flex" }}>
            <div style={{ marginRight: "5px", width: "40%" }}>
              <FormDropDown
                label={"Month"}
                name={"adult_safeguarding_lead_training_month"}
                register={register}
                options={[
                  "January",
                  "February",
                  "March",
                  "April",
                  "May",
                  "June",
                  "July",
                  "August",
                  "September",
                  "October",
                  "November",
                  "December",
                ]}
                error={errors.adult_safeguarding_lead_training_month}
              />
            </div>
            <div style={{ marginLeft: "5px", width: "40%" }}>
              <FormDropDown
                label={"Year"}
                name={"adult_safeguarding_lead_training_year"}
                register={register}
                options={getPreviousYears(30)}
                error={errors.adult_safeguarding_lead_training_year}
              />
            </div>
          </div>
        </>
      ) : null}
      <Button type="submit" label="Submit" margin="0 0 20px 0" />
      <Link to="/" onClick={(e) => goBackToPreviousStep(e)}>
        Go back to previous step
      </Link>
    </form>
  );
};

export default OrganisationAdultSupportForm;
