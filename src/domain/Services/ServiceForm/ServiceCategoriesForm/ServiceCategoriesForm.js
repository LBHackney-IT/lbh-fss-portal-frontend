import React, { useEffect, useState } from "react";
import FormFieldset from "../../../../components/FormFieldset/FormFieldset";
import Button from "../../../../components/Button/Button";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import FormCheckbox from "../../../../components/FormCheckbox/FormCheckbox";
import FormInput from "../../../../components/FormInput/FormInput";
import { breakpoint } from "../../../../utils/breakpoint/breakpoint";
import FormError from "../../../../components/FormError/FormError";
import { objAllFalse } from "../../../../utils/functions/functions";
// import { serviceCategories } from "../../../../utils/data/data";
import { Link } from "@reach/router";
import FormHelpText from "../../../../components/FormHelpText/FormHelpText";

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

const StyledUl = styled.ul`
  padding-left: 18px;
`;

function getPageQuestionNames(serviceCategories) {
  let pageQuestionNames = [];

  serviceCategories.forEach((category) => {
    pageQuestionNames.push(category.name);
    pageQuestionNames.push(category.details);
  });

  return pageQuestionNames;
}

const ServiceCategoriesForm = ({
  onSubmit,
  defaultValues = {},
  showHiddenField,
  setShowHiddenField,
  setShowHiddenFieldSnapshot,
  goBackToPreviousStep,
  serviceCategories,
}) => {
  const [showError, setShowError] = useState(false);

  const { register, handleSubmit, getValues } = useForm({
    defaultValues,
  });

  useEffect(() => {
    setShowHiddenFieldSnapshot(showHiddenField);
  }, []);

  function handleHiddenField(item) {
    setShowError(false);

    setShowHiddenField({
      ...showHiddenField,
      [item.details]: !showHiddenField[item.details],
    });
  }

  const pageQuestionNames = getPageQuestionNames(serviceCategories);

  return (
    <form
      onSubmit={handleSubmit(() => {
        if (objAllFalse(getValues())) {
          setShowError(true);
          return;
        } else {
          onSubmit(getValues(), pageQuestionNames);
        }
      })}
    >
      <FormFieldset label="What you do">
        <p>
          Please select the relevant categories and give a description of what
          you do for each.
        </p>
        <StyledUl>
          <li>Use first person, active voice (e.g. we provide...)</li>
          <li>Be concise, factual, avoid acronyms and jargon.</li>
          <li>Around 50 words or 255 characters.</li>
        </StyledUl>
        {serviceCategories.map((item) => {
          return (
            <div key={item.id}>
              <FormCheckbox
                name={item.name}
                label={item.label}
                value={item.id}
                register={register}
                onClick={() => handleHiddenField(item)}
              />

              {showHiddenField[item.details] ? (
                <StyledHiddenFieldContainer>
                  <FormInput
                    label={"Please describe what you do"}
                    name={item.details}
                    register={register}
                    spellCheck={"true"}
                    maxLength={255}
                    // error={errors}
                  />
                </StyledHiddenFieldContainer>
              ) : null}
            </div>
          );
        })}
        <FormHelpText helpText="Please review underlined spellings." />
      </FormFieldset>
      {showError ? (
        <FormError error="Please enter at least one category" />
      ) : null}

      <Button type="submit" label="Continue ›" margin="0 0 20px 0" />
      <Link to="/" onClick={(e) => goBackToPreviousStep(e)}>
        Go back to previous step
      </Link>
    </form>
  );
};

export default ServiceCategoriesForm;
