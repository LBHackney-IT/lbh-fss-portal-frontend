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
      <FormFieldset label="Services you provide">
        <p>
          Please select what categories you would like your service listed
          under.
        </p>
        <p>
          For each category you select please provide a description of what it
          is your service provides
        </p>
        <StyledUl>
          <li>Use first person, active voice (e.g. we provide...)</li>
          <li>Be concise, factual, avoid acronyms and jargon.</li>
          <li>Around 25 words (150 characters) would be great please!</li>
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
                    label={"Please describe this service"}
                    name={"lonOrIsDetails"}
                    register={register}
                    spellCheck={"true"}
                  />
                </StyledHiddenFieldContainer>
              ) : null}

              {showHiddenField.anxOrMHDetails && item.id === "anxOrMH" ? (
                <StyledHiddenFieldContainer>
                  <FormInput
                    label={"Please describe this service"}
                    name={"anxOrMHDetails"}
                    register={register}
                    spellCheck={"true"}
                  />
                </StyledHiddenFieldContainer>
              ) : null}

              {showHiddenField.safeAndHBDetails && item.id === "safeAndHB" ? (
                <StyledHiddenFieldContainer>
                  <FormInput
                    label={"Please describe this service"}
                    name={"safeAndHBDetails"}
                    register={register}
                    spellCheck={"true"}
                  />
                </StyledHiddenFieldContainer>
              ) : null}

              {showHiddenField.exAndWellDetails && item.id === "exAndWell" ? (
                <StyledHiddenFieldContainer>
                  <FormInput
                    label={"Please describe this service"}
                    name={"exAndWellDetails"}
                    register={register}
                    spellCheck={"true"}
                  />
                </StyledHiddenFieldContainer>
              ) : null}

              {showHiddenField.artAndCrtvDetails && item.id === "artAndCrtv" ? (
                <StyledHiddenFieldContainer>
                  <FormInput
                    label={"Please describe this service"}
                    name={"artAndCrtvDetails"}
                    register={register}
                    spellCheck={"true"}
                  />
                </StyledHiddenFieldContainer>
              ) : null}

              {showHiddenField.foodOrShopDetails && item.id === "foodOrShop" ? (
                <StyledHiddenFieldContainer>
                  <FormInput
                    label={"Please describe this service"}
                    name={"foodOrShopDetails"}
                    register={register}
                    spellCheck={"true"}
                  />
                </StyledHiddenFieldContainer>
              ) : null}

              {showHiddenField.faithActDetails && item.id === "faithAct" ? (
                <StyledHiddenFieldContainer>
                  <FormInput
                    label={"Please describe this service"}
                    name={"faithActDetails"}
                    register={register}
                    spellCheck={"true"}
                  />
                </StyledHiddenFieldContainer>
              ) : null}

              {showHiddenField.monAdvDetails && item.id === "monAdv" ? (
                <StyledHiddenFieldContainer>
                  <FormInput
                    label={"Please describe this service"}
                    name={"monAdvDetails"}
                    register={register}
                    spellCheck={"true"}
                  />
                </StyledHiddenFieldContainer>
              ) : null}

              {showHiddenField.emplAdvDetails && item.id === "emplAdv" ? (
                <StyledHiddenFieldContainer>
                  <FormInput
                    label={"Please describe this service"}
                    name={"emplAdvDetails"}
                    register={register}
                    spellCheck={"true"}
                  />
                </StyledHiddenFieldContainer>
              ) : null}

              {showHiddenField.houseAdvDetails && item.id === "houseAdv" ? (
                <StyledHiddenFieldContainer>
                  <FormInput
                    label={"Please describe this service"}
                    name={"houseAdvDetails"}
                    register={register}
                    spellCheck={"true"}
                  />
                </StyledHiddenFieldContainer>
              ) : null}

              {showHiddenField.immAdvDetails && item.id === "immAdv" ? (
                <StyledHiddenFieldContainer>
                  <FormInput
                    label={"Please describe this service"}
                    name={"immAdvDetails"}
                    register={register}
                    spellCheck={"true"}
                  />
                </StyledHiddenFieldContainer>
              ) : null}
            </div>
          );
        })}
      </FormFieldset>
      {showError ? (
        <FormError error="Please enter at least one category" />
      ) : null}

      <Button type="submit" label="Continue ›" />
    </form>
  );
};

export default ServiceCategoriesForm;
