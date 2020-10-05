import React, { useEffect } from "react";
import FormFieldset from "../../../../components/FormFieldset/FormFieldset";
import Button from "../../../../components/Button/Button";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import FormCheckbox from "../../../../components/FormCheckbox/FormCheckbox";
import { breakpoint } from "../../../../utils/breakpoint/breakpoint";
import { objAllFalse, objAllTrue } from "../../../../utils/functions/functions";
import { serviceDemographicCheckboxOptions } from "../../../../utils/data/data";

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

const ServiceDemographicsForm = ({ onSubmit, defaultValues = {} }) => {
  const { register, handleSubmit, setValue, getValues, reset } = useForm({
    defaultValues,
  });

  function setEveryoneTrueAllElseFalse() {
    let resetValues = {};

    serviceDemographicCheckboxOptions.forEach((demographic) => {
      resetValues[demographic.id] = false;
    });

    resetValues.everyone = true;

    reset(resetValues);
  }

  function handleCheckBoxClick(item) {
    if (item.id === "everyone") {
      setEveryoneTrueAllElseFalse();
    }
    if (item.id !== "everyone") {
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
          In order to make it easier for users of the website to find your
          service, please select who your service is for.
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
              onClick={() => handleCheckBoxClick(item)}
            />
            {item.id === "everyone" ? (
              <StyledHelp>
                If your service is for a <strong>specific audience</strong>,{" "}
                please select the the appropriate filters below.
              </StyledHelp>
            ) : null}
          </div>
        );
      })}
      <Button type="submit" label="Continue ›" margin="40px 0 30px 0" />
    </form>
  );
};

export default ServiceDemographicsForm;
