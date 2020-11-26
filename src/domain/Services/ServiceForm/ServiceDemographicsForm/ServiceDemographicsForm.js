import React, { useEffect } from "react";
import FormFieldset from "../../../../components/FormFieldset/FormFieldset";
import Button from "../../../../components/Button/Button";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import FormCheckbox from "../../../../components/FormCheckbox/FormCheckbox";
import { breakpoint } from "../../../../utils/breakpoint/breakpoint";
import { objAllFalse, objAllTrue } from "../../../../utils/functions/functions";
import { serviceDemographics } from "../../../../utils/data/data";
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
  const { register, handleSubmit, setValue, getValues, reset } = useForm({
    defaultValues,
  });

  function setEveryoneTrueAllElseFalse() {
    let resetValues = {};

    serviceDemographics.forEach((demographic) => {
      resetValues[demographic.name] = false;
    });

    resetValues.everyone = true;

    reset(resetValues);
  }

  function handleCheckBoxClick(item) {
    if (item.name === "everyone") {
      setEveryoneTrueAllElseFalse();
    }
    if (item.name !== "everyone") {
      setValue("everyone", false);
    }
    if (objAllFalse(getValues())) {
      setValue("everyone", true);
    }

    let valuesCopy = { ...getValues() };

    delete valuesCopy.everyone;

    if (objAllTrue(valuesCopy)) {
      setEveryoneTrueAllElseFalse();
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormFieldset label="Who you work with">
        <p>
          To make it easier for people to find your listing, please select who
          you support or work with.
        </p>
      </FormFieldset>
      {serviceDemographics.map((item) => {
        return (
          <div key={item.name}>
            <FormCheckbox
              name={item.name}
              label={item.label}
              value={item.id}
              register={register}
              onClick={() => handleCheckBoxClick(item)}
            />
            {item.name === "everyone" ? (
              <StyledHelp>
                If you support or work with a specific audience, please select
                the appropriate filters below.
              </StyledHelp>
            ) : null}
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
