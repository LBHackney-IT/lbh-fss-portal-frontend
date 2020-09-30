import React, { useEffect } from "react";
import FormFieldset from "../../../../components/FormFieldset/FormFieldset";
import Button from "../../../../components/Button/Button";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import FormCheckbox from "../../../../components/FormCheckbox/FormCheckbox";
import { breakpoint } from "../../../../utils/breakpoint/breakpoint";
import { objAllFalse } from "../../../../utils/functions/functions";

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
  if (!Object.keys(defaultValues).includes("everyone")) {
    defaultValues.everyone = true;
  }

  const { register, handleSubmit, setValue, getValues, reset } = useForm({
    defaultValues,
  });

  const checkboxOptions = [
    {
      id: "everyone",
      value: 1,
      label: "Everyone",
    },
    {
      id: "disbOrAut",
      value: 2,
      label: "Disabilities or autism",
    },
    {
      id: "men",
      value: 3,
      label: "Men",
    },
    {
      id: "women",
      value: 4,
      label: "Women",
    },
    {
      id: "lgbtqi",
      value: 5,
      label: "LGBTQI+",
    },
    {
      id: "chilYoungFam",
      value: 6,
      label: "Children, young people or families",
    },
    {
      id: "oldPe",
      value: 7,
      label: "Older people",
    },
    {
      id: "carers",
      value: 8,
      label: "Carers",
    },
    {
      id: "cultural",
      value: 9,
      label: "Cultural",
    },
  ];

  function handleCheckBoxClick(item) {
    if (item.id === "everyone") {
      reset();
      setValue("everyone", true);
    }
    if (item.id !== "everyone") {
      setValue("everyone", false);
    }
    if (objAllFalse(getValues())) {
      setValue("everyone", true);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormFieldset label="Who you work with">
        <p>
          In order to help make it easier for residents to help find your
          service please indicate who your service if for.
        </p>
      </FormFieldset>
      {checkboxOptions.map((item) => {
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
                If your service is for a <strong>specific audience</strong>{" "}
                please select from the following filters to indicate who your
                service is for:
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
