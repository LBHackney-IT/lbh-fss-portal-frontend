import React, { useEffect } from "react";
import FormFieldset from "../../../../components/FormFieldset/FormFieldset";
import Button from "../../../../components/Button/Button";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import FormCheckbox from "../../../../components/FormCheckbox/FormCheckbox";
import { breakpoint } from "../../../../utils/breakpoint/breakpoint";
import { objAllFalse, objAllTrue } from "../../../../utils/functions/functions";
import { serviceDemographicCheckboxOptions } from "../../../../utils/data/data";
import { Link } from "@reach/router";

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

const StyledHiddenFieldContainer = styled.div`
  margin-bottom: 50px;
`;

const StyledHelp = styled.p`
  margin-top: 40px;
`;

const ServiceDemographicsForm = ({
  onSubmit,
  defaultValues = {},
  goBackToPreviousStep,
}) => {
  const { register, handleSubmit } = useForm({
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormFieldset label="Who you work with">
        <p>
          To make it easier for people to find your listing, please select who
          you support or work with.
        </p>
      </FormFieldset>
      {serviceDemographicCheckboxOptions.map((item) => {
        return (
          <div key={item.id}>
            <FormCheckbox
              name={item.id}
              label={item.label}
              value={item.value}
              register={register}
            />
          </div>
        );
      })}
      <Button type="submit" label="Continue ›" margin="40px 0 20px 0" />
      <Link to="/" onClick={(e) => goBackToPreviousStep(e)}>
        Go back to previous step
      </Link>
    </form>
  );
};

export default ServiceDemographicsForm;
