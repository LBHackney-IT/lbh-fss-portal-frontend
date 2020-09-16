import React from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import Button from "../../../../components/Button/Button";
import FormCheckbox from "../../../../components/FormCheckbox/FormCheckbox";
import FormFieldset from "../../../../components/FormFieldset/FormFieldset";
import { grey } from "../../../../settings";

const StyledLeadText = styled.p`
  color: ${grey[400]};
`;

const OrganisationChildSupportForm = ({ defaultValues, onSubmit }) => {
  const { register, handleSubmit } = useForm({
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
        {["Yes", "No"].map((item) => {
          return (
            <div key={item}>
              <FormCheckbox
                name={item}
                label={item}
                value={item}
                register={register}
              />
            </div>
          );
        })}
      </FormFieldset>
      <Button type="submit" label="Continue ›" />
    </form>
  );
};

export default OrganisationChildSupportForm;
