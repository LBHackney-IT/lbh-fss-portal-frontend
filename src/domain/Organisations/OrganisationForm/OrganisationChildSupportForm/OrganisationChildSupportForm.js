import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import Button from "../../../../components/Button/Button";
import FormRadio from "../../../../components/FormRadio/FormRadio";
import FormFieldset from "../../../../components/FormFieldset/FormFieldset";
import { grey } from "../../../../settings";
import FormInput from "../../../../components/FormInput/FormInput";
import FormError from "../../../../components/FormError/FormError";
import FormDropDown from "../../../../components/FormDropDown/FormDropDown";
import { getPreviousYears } from "../../../../utils/functions/functions";

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
  setShowHiddenFieldSnapshot,
}) => {
  const { register, handleSubmit, getValues, errors } = useForm({
    defaultValues,
  });

  useEffect(() => {
    setShowHiddenFieldSnapshot(showHiddenField);
  }, []);

  const pageQuestionNames = [
    "has_child_support",
    "has_child_safeguarding_lead",
    "child_safeguarding_lead_first_name",
    "child_safeguarding_lead_last_name",
    "child_safeguarding_lead_training_month",
    "child_safeguarding_lead_training_year",
  ];

  return (
    <form
      onSubmit={handleSubmit(() => onSubmit(getValues(), pageQuestionNames))}
    >
      <FormFieldset label="Do you provide support or activities for people under 16?">
        <StyledLeadText>
          We are asking you this because there are additional safeguarding
          checks for organisations working with under 16's.
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
                  name="has_child_support"
                  label={item}
                  value={item.toLowerCase()}
                  register={register}
                  required
                  onClick={() => {
                    if (item === "Yes") {
                      setShowHiddenField({
                        ...showHiddenField,
                        childSafeGuardLead: true,
                        childSafeguardLeadDetails: false,
                      });
                      defaultValues.has_child_safeguarding_lead = null;
                    } else {
                      setShowHiddenField({
                        ...showHiddenField,
                        childSafeGuardLead: false,
                      });
                    }
                  }}
                />
              </StyledRadioOption>
            );
          })}
        </StyledRadioOptionDiv>
      </FormFieldset>
      {errors.has_child_support &&
        errors.has_child_support.type === "required" && (
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
                    name="has_child_safeguarding_lead"
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
      {errors.has_child_safeguarding_lead &&
        errors.has_child_safeguarding_lead.type === "required" && (
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
            name={"child_safeguarding_lead_first_name"}
            register={register}
            maxLength={255}
            error={errors.child_safeguarding_lead_first_name}
          />
          <FormInput
            label={"Last name"}
            name={"child_safeguarding_lead_last_name"}
            register={register}
            maxLength={255}
            error={errors.child_safeguarding_lead_last_name}
          />
          <StyledQuestion>
            Date of the designated safeguarding lead training{" "}
          </StyledQuestion>
          <div style={{ display: "flex" }}>
            <div style={{ marginRight: "5px", width: "40%" }}>
              <FormDropDown
                label={"Month"}
                name={"child_safeguarding_lead_training_month"}
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
              />
            </div>
            <div style={{ marginLeft: "5px", width: "40%" }}>
              <FormDropDown
                label={"Year"}
                name={"child_safeguarding_lead_training_year"}
                register={register}
                options={getPreviousYears(30)}
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
