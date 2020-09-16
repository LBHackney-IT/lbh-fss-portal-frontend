import React, { useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import Button from "../../../../components/Button/Button";
import FormRadio from "../../../../components/FormRadio/FormRadio";
import FormFieldset from "../../../../components/FormFieldset/FormFieldset";
import { grey } from "../../../../settings";
import FormInput from "../../../../components/FormInput/FormInput";

const StyledLeadText = styled.p`
  color: ${grey[400]};
`;

const StyledRadioOptionsContainer = styled.div`
  display: flex;
`;
const StyledRadioOption = styled.div`
  display: inline;
  margin: 10px;
`;

const StyledQuestion = styled.p`
  font-size: 19px;
  font-weight: bold;
`;

const OrganisationChildSupportForm = ({ defaultValues, onSubmit }) => {
  const { register, handleSubmit, errors } = useForm({
    defaultValues,
  });

  const [showSafeguardLead, setShowSafeguardLead] = useState(false);
  const [showSafeguardLeadDetails, setShowSafeguardLeadDetails] = useState(
    false
  );

  function handleHiddenField(id) {}

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
        {["Yes", "No"].map((item) => {
          return (
            <StyledRadioOption
              key={item}
              onClick={() =>
                item === "Yes"
                  ? setShowSafeguardLead(true)
                  : setShowSafeguardLead(false)
              }
            >
              <FormRadio
                key={item}
                name="hasChildSupport"
                label={item}
                value={item.toLowerCase()}
                register={register}
              />
            </StyledRadioOption>
          );
        })}
      </FormFieldset>

      {showSafeguardLead ? (
        <FormFieldset label="Does your organisation have a Children’s Safeguarding Lead?">
          {["Yes", "No"].map((item) => {
            return (
              <StyledRadioOption
                key={item}
                onClick={() =>
                  item === "Yes"
                    ? setShowSafeguardLeadDetails(true)
                    : setShowSafeguardLeadDetails(false)
                }
              >
                <FormRadio
                  key={item}
                  name="hasChildSafeguardingLead"
                  label={item}
                  value={item.toLowerCase()}
                  register={register}
                />
              </StyledRadioOption>
            );
          })}
        </FormFieldset>
      ) : null}

      {showSafeguardLead && showSafeguardLeadDetails ? (
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
