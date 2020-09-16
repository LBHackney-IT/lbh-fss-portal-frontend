import React, { useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import Button from "../../../../components/Button/Button";
import FormRadio from "../../../../components/FormRadio/FormRadio";
import FormCheckbox from "../../../../components/FormCheckbox/FormCheckbox";
import FormFieldset from "../../../../components/FormFieldset/FormFieldset";
import { grey } from "../../../../settings";

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

const OrganisationChildSupportForm = ({ defaultValues, onSubmit }) => {
  const { register, handleSubmit } = useForm({
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

      <Button type="submit" label="Continue ›" />
    </form>
  );
};

export default OrganisationChildSupportForm;
