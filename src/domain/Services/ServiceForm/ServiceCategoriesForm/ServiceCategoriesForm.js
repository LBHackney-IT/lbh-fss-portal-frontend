import React, { useEffect, useState } from "react";
import FormFieldset from "../../../../components/FormFieldset/FormFieldset";
import Button from "../../../../components/Button/Button";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import FormCheckbox from "../../../../components/FormCheckbox/FormCheckbox";
import FormInput from "../../../../components/FormInput/FormInput";
import { breakpoint } from "../../../../utils/breakpoint/breakpoint";
import { serviceCategoryFields } from "../../../../utils/data/data";
import FormError from "../../../../components/FormError/FormError";
import { objAllFalse } from "../../../../utils/functions/functions";
import { serviceCategoryCheckboxOptions } from "../../../../utils/data/data";
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

const ServiceCategoriesForm = ({
  onSubmit,
  defaultValues = {},
  showHiddenField,
  setShowHiddenField,
  setShowHiddenFieldSnapshot,
  goBackToPreviousStep,
}) => {
  const [showError, setShowError] = useState(false);

  const { register, handleSubmit, errors, getValues } = useForm({
    defaultValues,
  });

  useEffect(() => {
    setShowHiddenFieldSnapshot(showHiddenField);
  }, []);

  function handleHiddenField(id) {
    setShowError(false);
    switch (id) {
      case "lonOrIs":
        setShowHiddenField({
          ...showHiddenField,
          lonOrIsDetails: !showHiddenField.lonOrIsDetails,
        });
        break;
      case "anxOrMH":
        setShowHiddenField({
          ...showHiddenField,
          anxOrMHDetails: !showHiddenField.anxOrMHDetails,
        });
        break;
      case "safeAndHB":
        setShowHiddenField({
          ...showHiddenField,
          safeAndHBDetails: !showHiddenField.safeAndHBDetails,
        });
        break;
      case "exAndWell":
        setShowHiddenField({
          ...showHiddenField,
          exAndWellDetails: !showHiddenField.exAndWellDetails,
        });
        break;
      case "artAndCrtv":
        setShowHiddenField({
          ...showHiddenField,
          artAndCrtvDetails: !showHiddenField.artAndCrtvDetails,
        });
        break;
      case "foodOrShop":
        setShowHiddenField({
          ...showHiddenField,
          foodOrShopDetails: !showHiddenField.foodOrShopDetails,
        });
        break;
      case "faithAct":
        setShowHiddenField({
          ...showHiddenField,
          faithActDetails: !showHiddenField.faithActDetails,
        });
        break;
      case "monAdv":
        setShowHiddenField({
          ...showHiddenField,
          monAdvDetails: !showHiddenField.monAdvDetails,
        });
        break;

      case "emplAdv":
        setShowHiddenField({
          ...showHiddenField,
          emplAdvDetails: !showHiddenField.emplAdvDetails,
        });
        break;
      case "houseAdv":
        setShowHiddenField({
          ...showHiddenField,
          houseAdvDetails: !showHiddenField.houseAdvDetails,
        });
        break;
      case "immAdv":
        setShowHiddenField({
          ...showHiddenField,
          immAdvDetails: !showHiddenField.immAdvDetails,
        });
        break;
      default:
        return false;
    }
  }

  const pageQuestionNames = serviceCategoryFields;
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);
  const [count3, setCount3] = useState(0);
  const [count4, setCount4] = useState(0);
  const [count5, setCount5] = useState(0);
  const [count6, setCount6] = useState(0);
  const [count7, setCount7] = useState(0);
  const [count8, setCount8] = useState(0);
  const [count9, setCount9] = useState(0);
  const [count10, setCount10] = useState(0);
  const [count11, setCount11] = useState(0);

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
        {serviceCategoryCheckboxOptions.map((item) => {
          return (
            <div key={item.id}>
              <FormCheckbox
                name={item.id}
                label={item.label}
                value={item.value}
                register={register}
                onClick={() => handleHiddenField(item.id)}
              />

              {showHiddenField.lonOrIsDetails && item.id === "lonOrIs" ? (
                <StyledHiddenFieldContainer>
                  <FormInput
                    label={"Please describe what you do"}
                    name={"lonOrIsDetails"}
                    register={register}
                    spellCheck={"true"}
                    maxLength={255}
                    error={errors.lonOrIsDetails}
                    required
                    count={count1}
                    setCount={setCount1}
                    showCounter={true}
                  />
                </StyledHiddenFieldContainer>
              ) : null}

              {showHiddenField.anxOrMHDetails && item.id === "anxOrMH" ? (
                <StyledHiddenFieldContainer>
                  <FormInput
                    label={"Please describe what you do"}
                    name={"anxOrMHDetails"}
                    register={register}
                    spellCheck={"true"}
                    maxLength={255}
                    error={errors.anxOrMHDetails}
                    required
                    count={count2}
                    setCount={setCount2}
                    showCounter={true}
                  />
                </StyledHiddenFieldContainer>
              ) : null}

              {showHiddenField.safeAndHBDetails && item.id === "safeAndHB" ? (
                <StyledHiddenFieldContainer>
                  <FormInput
                    label={"Please describe what you do"}
                    name={"safeAndHBDetails"}
                    register={register}
                    spellCheck={"true"}
                    maxLength={255}
                    error={errors.safeAndHBDetails}
                    required
                    count={count3}
                    setCount={setCount3}
                    showCounter={true}
                  />
                </StyledHiddenFieldContainer>
              ) : null}

              {showHiddenField.exAndWellDetails && item.id === "exAndWell" ? (
                <StyledHiddenFieldContainer>
                  <FormInput
                    label={"Please describe what you do"}
                    name={"exAndWellDetails"}
                    register={register}
                    spellCheck={"true"}
                    maxLength={255}
                    error={errors.exAndWellDetails}
                    required
                    count={count4}
                    setCount={setCount4}
                    showCounter={true}
                  />
                </StyledHiddenFieldContainer>
              ) : null}

              {showHiddenField.artAndCrtvDetails && item.id === "artAndCrtv" ? (
                <StyledHiddenFieldContainer>
                  <FormInput
                    label={"Please describe what you do"}
                    name={"artAndCrtvDetails"}
                    register={register}
                    spellCheck={"true"}
                    maxLength={255}
                    error={errors.artAndCrtvDetails}
                    required
                    count={count5}
                    setCount={setCount5}
                    showCounter={true}
                  />
                </StyledHiddenFieldContainer>
              ) : null}

              {showHiddenField.foodOrShopDetails && item.id === "foodOrShop" ? (
                <StyledHiddenFieldContainer>
                  <FormInput
                    label={"Please describe what you do"}
                    name={"foodOrShopDetails"}
                    register={register}
                    spellCheck={"true"}
                    maxLength={255}
                    error={errors.foodOrShopDetails}
                    required
                    count={count6}
                    setCount={setCount6}
                    showCounter={true}
                  />
                </StyledHiddenFieldContainer>
              ) : null}

              {showHiddenField.faithActDetails && item.id === "faithAct" ? (
                <StyledHiddenFieldContainer>
                  <FormInput
                    label={"Please describe what you do"}
                    name={"faithActDetails"}
                    register={register}
                    spellCheck={"true"}
                    maxLength={255}
                    error={errors.faithActDetails}
                    required
                    count={count7}
                    setCount={setCount7}
                    showCounter={true}
                  />
                </StyledHiddenFieldContainer>
              ) : null}

              {showHiddenField.monAdvDetails && item.id === "monAdv" ? (
                <StyledHiddenFieldContainer>
                  <FormInput
                    label={"Please describe what you do"}
                    name={"monAdvDetails"}
                    register={register}
                    spellCheck={"true"}
                    maxLength={255}
                    error={errors.monAdvDetails}
                    required
                    count={count8}
                    setCount={setCount8}
                    showCounter={true}
                  />
                </StyledHiddenFieldContainer>
              ) : null}

              {showHiddenField.emplAdvDetails && item.id === "emplAdv" ? (
                <StyledHiddenFieldContainer>
                  <FormInput
                    label={"Please describe what you do"}
                    name={"emplAdvDetails"}
                    register={register}
                    spellCheck={"true"}
                    maxLength={255}
                    error={errors.emplAdvDetails}
                    required
                    count={count9}
                    setCount={setCount9}
                    showCounter={true}
                  />
                </StyledHiddenFieldContainer>
              ) : null}

              {showHiddenField.houseAdvDetails && item.id === "houseAdv" ? (
                <StyledHiddenFieldContainer>
                  <FormInput
                    label={"Please describe what you do"}
                    name={"houseAdvDetails"}
                    register={register}
                    spellCheck={"true"}
                    maxLength={255}
                    error={errors.houseAdvDetails}
                    required
                    count={count10}
                    setCount={setCount10}
                    showCounter={true}
                  />
                </StyledHiddenFieldContainer>
              ) : null}

              {showHiddenField.immAdvDetails && item.id === "immAdv" ? (
                <StyledHiddenFieldContainer>
                  <FormInput
                    label={"Please describe what you do"}
                    name={"immAdvDetails"}
                    register={register}
                    spellCheck={"true"}
                    maxLength={255}
                    error={errors.immAdvDetails}
                    required
                    count={count11}
                    setCount={setCount11}
                    showCounter={true}
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
