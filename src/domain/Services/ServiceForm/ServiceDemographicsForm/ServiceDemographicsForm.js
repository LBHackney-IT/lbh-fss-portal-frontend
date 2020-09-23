import React, { useEffect } from "react";
import FormFieldset from "../../../../components/FormFieldset/FormFieldset";
import Button from "../../../../components/Button/Button";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import FormCheckbox from "../../../../components/FormCheckbox/FormCheckbox";
import { breakpoint } from "../../../../utils/breakpoint/breakpoint";

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
  const { register, handleSubmit } = useForm({
    defaultValues,
  });

  const checkboxOptions = [
    {
      id: "disbOrAut",
      value: 1,
      label: "Disabilities or autism",
    },
    {
      id: "men",
      value: 2,
      label: "Men",
    },
    {
      id: "women",
      value: 3,
      label: "Women",
    },
    {
      id: "lgbtqi",
      value: 4,
      label: "LGBTQI+",
    },
    {
      id: "chilYoungFam",
      value: 5,
      label: "Children, young people or families",
    },
    {
      id: "oldPe",
      value: 6,
      label: "Older people",
    },
    {
      id: "carers",
      value: 7,
      label: "Carers",
    },
    {
      id: "cultural",
      value: 8,
      label: "Cultural",
    },
    {
      id: "everyone",
      value: 9,
      label: "Everyone",
    },
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormFieldset label="Who you work with">
        <p>
          Select the following filters if your service is for a specific
          audience.
        </p>
        <p>
          This will help make it easier for residents to help find your service.
        </p>
      </FormFieldset>
      <FormFieldset label="Search keywords">
        <p>
          Include one or more keywords that describe your service. These
          keywords make search results more accurate. Separate keywords with a
          comma.
        </p>
      </FormFieldset>
      {checkboxOptions.map((item) => {
        return (
          <div key={item.id}>
            {item.id === "everyone" ? (
              <StyledHelp>
                Alternatively, if what you do can be accessed by everyone select
                the following:
              </StyledHelp>
            ) : null}
            <FormCheckbox
              name={item.id}
              label={item.label}
              value={item.value}
              register={register}
            />
          </div>
        );
      })}
      <Button type="submit" label="Continue ›" margin="40px 0 30px 0" />
    </form>
  );
};

export default ServiceDemographicsForm;
