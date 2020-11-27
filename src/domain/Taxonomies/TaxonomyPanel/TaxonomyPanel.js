import React from "react";
import FormInput from "../../../components/FormInput/FormInput";
import Button from "../../../components/Button/Button";
import { red } from "../../../settings/colors";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import AppLoading from "../../../AppLoading";

const StyledTaxonomyItemContainer = styled.div`
  display: flex;
  max-width: 438px;
  justify-content: space-between;
`;

const StyledTaxonomyItem = styled.p`
  font-size: 18px;
  margin: 8px 0;
`;

const StyledDeleteTaxonomyItem = styled.p`
  display: flex;
  align-items: center;
  margin: 8px 0 8px 10px;
`;

const TaxonomyPanel = ({
  taxonomyName,
  taxonomyTerms,
  isLoading,
  addTerm,
  removeTerm,
  titleStyle,
}) => {
  const { register, handleSubmit, errors, getValues } = useForm();

  if (isLoading) {
    return (
      <>
        <h2 style={titleStyle}>{taxonomyName}</h2>
        <AppLoading margin={"0 30px"} />
      </>
    );
  }

  return (
    <>
      <h2 style={titleStyle}>{taxonomyName}</h2>
      <div style={{ margin: "20px 0 40px 0" }}>
        {taxonomyTerms.map((term, index) => {
          return (
            <div key={index}>
              <StyledTaxonomyItemContainer>
                <StyledTaxonomyItem>{term.label}</StyledTaxonomyItem>

                <StyledDeleteTaxonomyItem>
                  <Button
                    label="X"
                    backgroundColor={red[400]}
                    buttonStyle={{
                      padding: "0",
                      margin: "0",
                      height: "26px",
                      width: "25px",
                      fontSize: "13px",
                      fontWeight: "bold",
                    }}
                    onClick={() => removeTerm(term)}
                  />
                </StyledDeleteTaxonomyItem>
              </StyledTaxonomyItemContainer>
            </div>
          );
        })}
      </div>

      <form onSubmit={handleSubmit(addTerm)}>
        <FormInput
          name="term"
          label={`Add term to ${taxonomyName.toLowerCase()} taxonomy`}
          register={register}
          error={errors.demographic}
          required
          maxLength={255}
        />
        <Button type="submit" label={"Submit"} />
      </form>
    </>
  );
};

export default TaxonomyPanel;
