import React, { useState } from "react";
import { useForm } from "react-hook-form";
import FormFieldset from "../../../../components/FormFieldset/FormFieldset";
import FormRadio from "../../../../components/FormRadio/FormRadio";
import Button from "../../../../components/Button/Button";
import styled from "styled-components";
import { red } from "../../../../settings";
import FormError from "../../../../components/FormError/FormError";

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
`;

const StyledRadioOption = styled.div`
  display: inline;
  margin: 10px;
`;

const OrganisationConfirmLocationForm = ({ onSubmit, defaultValues = {} }) => {
  const { register, handleSubmit, errors } = useForm({
    defaultValues,
  });

  const [selectedNo, setSelectedNo] = useState(false);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <StyledRadioOptionsContainer>
        <FormFieldset label="Does your organisation provide support or activities for Hackney or City residents?">
          <StyledRadioOptionDiv>
            {["Yes", "No"].map((item) => {
              return (
                <StyledRadioOption
                  key={item}
                  onClick={() =>
                    item === "No" ? setSelectedNo(true) : setSelectedNo(false)
                  }
                >
                  <FormRadio
                    key={item}
                    name="isHackneyBased"
                    label={item}
                    value={item.toLowerCase()}
                    register={register}
                    required
                  />
                </StyledRadioOption>
              );
            })}
          </StyledRadioOptionDiv>
          {errors.isHackneyBased &&
            errors.isHackneyBased.type === "required" && (
              <FormError
                error={"Please complete this question"}
                marginTop="10px"
                marginBottom="10px"
              />
            )}
        </FormFieldset>
      </StyledRadioOptionsContainer>
      {selectedNo ? (
        <StyledErrorContainer
          style={{ backgroundColor: "rgba(190, 58, 52, 0.05)" }}
        >
          <p>
            Your organisation needs to offer services in Hackney or for City
            residents to be listed in this directory
          </p>

          <p>
            Contact <a href="mailto:fss@hackney.gov.uk">fss@hackney.gov.uk</a>{" "}
            if you wish to discuss further
          </p>
        </StyledErrorContainer>
      ) : (
        <Button type="submit" label="Continue ›" />
      )}
    </form>
  );
};

export default OrganisationConfirmLocationForm;