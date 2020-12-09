import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import FormFieldset from "../../../../components/FormFieldset/FormFieldset";
import FormRadio from "../../../../components/FormRadio/FormRadio";
import Button from "../../../../components/Button/Button";
import styled from "styled-components";
import { red } from "../../../../settings";
import FormError from "../../../../components/FormError/FormError";
import { Link } from "@reach/router";

const StyledErrorContainer = styled.div`
  padding: 20px;
  border-left: 7px solid ${red[400]};
  border-radius: 2px;
  margin: 5px 0 10px 0;
`;

const StyledRadioOptionsContainer = styled.div`
  display: flex;
`;

const StyledRadioOptionDiv = styled.div`
  margin-top: 10px;
  display: flex;
`;

const StyledRadioOption = styled.div`
  display: inline;
`;

const OrganisationConfirmLocationForm = ({
  onSubmit,
  defaultValues = {},
  showHiddenField,
  setShowHiddenField,
  setShowHiddenFieldSnapshot,
  goBackToPreviousStep,
}) => {
  const { register, handleSubmit, errors, getValues } = useForm({
    defaultValues,
  });

  useEffect(() => {
    setShowHiddenFieldSnapshot(showHiddenField);
  }, []);

  const pageQuestionNames = ["is_hackney_based"];

  return (
    <form
      onSubmit={handleSubmit(() => onSubmit(getValues(), pageQuestionNames))}
    >
      <StyledRadioOptionsContainer>
        <FormFieldset label="Does your organisation provide support or activities for Hackney or City residents?">
          <StyledRadioOptionDiv>
            {["Yes", "No"].map((item) => {
              return (
                <StyledRadioOption key={item}>
                  <FormRadio
                    key={item}
                    name="is_hackney_based"
                    label={item}
                    value={item.toLowerCase()}
                    register={register}
                    required
                    onClick={() =>
                      item === "No"
                        ? setShowHiddenField({
                            ...showHiddenField,
                            notBasedInWarning: true,
                          })
                        : setShowHiddenField({
                            ...showHiddenField,
                            notBasedInWarning: false,
                          })
                    }
                  />
                </StyledRadioOption>
              );
            })}
          </StyledRadioOptionDiv>
          {errors.is_hackney_based &&
            errors.is_hackney_based.type === "required" && (
              <FormError
                error={"Please complete this question"}
                marginTop="10px"
                marginBottom="10px"
              />
            )}
        </FormFieldset>
      </StyledRadioOptionsContainer>
      {showHiddenField.notBasedInWarning ? (
        <StyledErrorContainer
          style={{ backgroundColor: "rgba(190, 58, 52, 0.05)" }}
        >
          <p>
            Your organisation needs to offer services to Hackney or City of
            London residents to be listed in Find support services.
          </p>

          <p>
            Contact <a href="mailto:fss@hackney.gov.uk">fss@hackney.gov.uk</a>{" "}
            if you wish to discuss further.
          </p>
        </StyledErrorContainer>
      ) : (
        <Button type="submit" label="Continue ›" margin="0 0 20px 0" />
      )}
      <Link to="/" onClick={(e) => goBackToPreviousStep(e)}>
        Go back to previous step
      </Link>
    </form>
  );
};

export default OrganisationConfirmLocationForm;
