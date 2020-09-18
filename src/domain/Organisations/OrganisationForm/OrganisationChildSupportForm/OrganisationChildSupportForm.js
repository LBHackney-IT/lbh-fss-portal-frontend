import React, { useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import Button from "../../../../components/Button/Button";
import FormRadio from "../../../../components/FormRadio/FormRadio";
import FormFieldset from "../../../../components/FormFieldset/FormFieldset";
import { grey } from "../../../../settings";
import FormInput from "../../../../components/FormInput/FormInput";
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

const OrganisationChildSupportForm = ({
  defaultValues,
  onSubmit,
  showHiddenField,
  setShowHiddenField,
}) => {
  const { register, handleSubmit, errors } = useForm({
    defaultValues,
  });



  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormFieldset label="Do you provide support or activities for people under 16?">
        <StyledLeadText>
          Lorem ipsum dolo r sit amet, consectetur adipis cing elit. Nullam
          aliquam bibendum dapibus.
          <a href="">
            Click here to see the statutory guidance and best practice
          </a>
        </StyledLeadText>
        <StyledRadioOptionDiv>
          {["Yes", "No"].map((item) => {
            return (
              <StyledRadioOption key={item}>
                <FormRadio
                  key={item}
                  name="hasChildSupport"
                  label={item}
                  value={item.toLowerCase()}
                  register={register}
                  required
                  onClick={() =>
                    item === "Yes"
                      ? setShowHiddenField({
                          ...showHiddenField,
                          childSafeGuardLead: true,
                        })
                      : setShowHiddenField({
                          ...showHiddenField,
                          childSafeGuardLead: false,
                        })
                  }
                />
              </StyledRadioOption>
            );
          })}
        </StyledRadioOptionDiv>
      </FormFieldset>
      {errors.hasChildSupport && errors.hasChildSupport.type === "required" && (
        <FormError
          error={"Please complete this question"}
          marginTop="10px"
          marginBottom="20px"
        />
      )}
      {showHiddenField.childSafeGuardLead ? (
        <FormFieldset label="Does your organisation have a Children’s Safeguarding Lead?">
          <StyledRadioOptionDiv>
            {["Yes", "No"].map((item) => {
              return (
                <StyledRadioOption key={item}>
                  <FormRadio
                    key={item}
                    name="hasChildSafeguardingLead"
                    label={item}
                    value={item.toLowerCase()}
                    register={register}
                    required
                    onClick={() =>
                      item === "Yes"
                        ? setShowHiddenField({
                            ...showHiddenField,
                            childSafeguardLeadDetails: true,
                          })
                        : setShowHiddenField({
                            ...showHiddenField,
                            childSafeguardLeadDetails: false,
                          })
                    }
                  />
                </StyledRadioOption>
              );
            })}
          </StyledRadioOptionDiv>
        </FormFieldset>
      ) : null}
      {errors.hasChildSafeguardingLead &&
        errors.hasChildSafeguardingLead.type === "required" && (
          <FormError
            error={"Please complete this question"}
            marginTop="10px"
            marginBottom="20px"
          />
        )}
      {showHiddenField.childSafeGuardLead &&
      showHiddenField.childSafeguardLeadDetails ? (
        <>
          <p>
            What are your organisations Children's safeguarding lead details?
          </p>

          <FormInput
            label={"First name"}
            name={"childSafeguardingLeadFirstName"}
            register={register}
            required
            error={errors.childSafeguardingLeadFirstName}
          />
          <FormInput
            label={"Last name"}
            name={"childSafeguardingLeadLastName"}
            register={register}
            required
            error={errors.childSafeguardingLeadLastName}
          />
          <StyledQuestion>
            Date of the designated safeguarding lead training{" "}
          </StyledQuestion>
          <div style={{ display: "flex" }}>
            <div style={{ marginRight: "5px", width: "30%" }}>
              <FormInput
                label={"Month"}
                type={"number"}
                name={"childSafeguardingLeadTrainingMonth"}
                register={register}
              />
            </div>
            <div style={{ marginLeft: "5px", width: "30%" }}>
              <FormInput
                label={"Year"}
                type={"number"}
                name={"childSafeguardingLeadTrainingYear"}
                register={register}
              />
            </div>
          </div>
        </>
      ) : null}
      <Button type="submit" label="Continue ›" />
    </form>
  );
};

export default OrganisationChildSupportForm;
