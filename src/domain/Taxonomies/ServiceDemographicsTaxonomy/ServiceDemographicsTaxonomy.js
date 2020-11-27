import React from "react";
import FormInput from "../../../components/FormInput/FormInput";
import Button from "../../../components/Button/Button";
import { red } from "../../../settings/colors";
import { useForm } from "react-hook-form";
import styled from "styled-components";

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

const ServiceDemographicsTaxonomy = ({ serviceDemographics }) => {
  const { register, handleSubmit, errors, getValues } = useForm();

  return (
    <>
      <h2 style={{ margin: "0" }}>Demographics</h2>

      <div style={{ margin: "20px 0 40px 0" }}>
        {serviceDemographics.map((demographic) => {
          return (
            // <div style={{ height: "30px" }}>
            <div>
              <StyledTaxonomyItemContainer>
                <StyledTaxonomyItem>{demographic.label}</StyledTaxonomyItem>

                <StyledDeleteTaxonomyItem>
                  <Button
                    label="X"
                    backgroundColor={red[400]}
                    buttonStyle={{
                      padding: "5px",
                      margin: "0",
                      height: "22px",
                      fontSize: "11px",
                      fontWeight: "bold",
                    }}
                  />
                </StyledDeleteTaxonomyItem>
              </StyledTaxonomyItemContainer>
            </div>
          );
        })}
      </div>

      <form>
        <FormInput
          name="demographic"
          label="Add demographic"
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

export default ServiceDemographicsTaxonomy;
