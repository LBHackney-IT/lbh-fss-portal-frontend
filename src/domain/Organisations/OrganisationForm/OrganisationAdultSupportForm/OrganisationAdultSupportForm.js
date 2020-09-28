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
}) => {
  const { register, handleSubmit, errors, getValues } = useForm({
    defaultValues,
  });

  const pageQuestionNames = [
    "hasAdultSupport",
    "hasAdultSafeguardingLead",
    "adultSafeguardingLeadFirstName",
    "adultSafeguardingLeadLastName",
    "adultSafeguardingLeadTrainingMonth",
    "adultSafeguardingLeadTrainingYear",
  ];

  return (
    <form
      onSubmit={handleSubmit(() => onSubmit(getValues(), pageQuestionNames))}
    >
      <FormFieldset label="Do you provide support or activities for vulnerable adults?">
        <StyledLeadText>
          Lorem ipsum dolo r sit amet, consectetur adipis cing elit. Nullam
          aliquam bibendum dapibus.
          <a href="" target="_blank">
            Click here to see the statutory guidance and best practice
          </a>
        </StyledLeadText>
        <StyledRadioOptionDiv>
          {["Yes", "No"].map((item) => {
            return (
              <StyledRadioOption key={item}>
                <FormRadio
                  key={item}
                  name="hasAdultSupport"
                  label={item}
                  value={item.toLowerCase()}
                  register={register}
                  required
                  onClick={() =>
                    item === "Yes"
                      ? setShowHiddenField({
                          ...showHiddenField,
                          adultSafeguardLead: true,
                        })
                      : setShowHiddenField({
                          ...showHiddenField,
                          adultSafeguardLead: false,
                        })
                  }
                />
              </StyledRadioOption>
            );
          })}
        </StyledRadioOptionDiv>
      </FormFieldset>
      {errors.hasAdultSupport && errors.hasAdultSupport.type === "required" && (
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
                    name="hasAdultSafeguardingLead"
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
      {errors.hasAdultSafeguardingLead &&
        errors.hasAdultSafeguardingLead.type === "required" && (
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
            name={"adultSafeguardingLeadFirstName"}
            register={register}
            maxLength={255}
            error={errors.adultSafeguardingLeadFirstName}
          />
          <FormInput
            label={"Last name"}
            name={"adultSafeguardingLeadLastName"}
            register={register}
            maxLength={255}
            error={errors.adultSafeguardingLeadLastName}
          />
          <StyledQuestion>
            Date of the designated safeguarding lead training{" "}
          </StyledQuestion>
          <div style={{ display: "flex" }}>
            <div style={{ marginRight: "5px", width: "40%" }}>
              <FormDropDown
                label={"Month"}
                name={"adultSafeguardingLeadTrainingMonth"}
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
                error={errors.adultSafeguardingLeadTrainingMonth}
              />
            </div>
            <div style={{ marginLeft: "5px", width: "40%" }}>
              <FormDropDown
                label={"Year"}
                name={"adultSafeguardingLeadTrainingYear"}
                register={register}
                options={getPreviousYears(30)}
                error={errors.adultSafeguardingLeadTrainingYear}
              />
            </div>
          </div>
        </>
      ) : null}
      <Button type="submit" label="Submit" />
    </form>
  );
};

export default OrganisationAdultSupportForm;
