import React, { useState } from "react";
import FormInput from "../../../components/FormInput/FormInput";
import Button from "../../../components/Button/Button";
import { red } from "../../../settings/colors";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import AppLoading from "../../../AppLoading";
import { toast } from "react-toastify";

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

const ServiceDemographicsTaxonomy = ({
  serviceDemographics,
  setServiceDemographics,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, errors, getValues } = useForm();

  function doAddDemographic(values) {
    console.log(values);
    setIsLoading(true);

    // make call to POST /taxonomies
    const updatedDemographics = [];

    setIsLoading(false);

    if (updatedDemographics) {
      toast.success(
        `Successfully added '${values.demographic}' taxonomy term.`
      );
    } else {
      toast.error(`Failed to add '${values.demographic}' taxonomy term.`);
    }
  }

  function doRemoveDemographic(demographic) {
    setIsLoading(true);

    // make call to DELETE /taxonomies/{id}
    // demographic.id
    const demographicRemoved = [];

    setIsLoading(false);

    if (demographicRemoved) {
      toast.success(
        `Successfully removed '${demographic.label}' taxonomy term.`
      );
    } else {
      toast.error(`Failed to remove '${demographic.label}' taxonomy term.`);
    }
  }

  if (isLoading) {
    return (
      <>
        <h2 style={{ margin: "0" }}>Demographics</h2>{" "}
        <AppLoading margin={"0 30px"} />
      </>
    );
  }

  return (
    <>
      <h2 style={{ margin: "0" }}>Demographics</h2>

      <div style={{ margin: "20px 0 40px 0" }}>
        {serviceDemographics.map((demographic, index) => {
          return (
            <div key={index}>
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
                    onClick={() => doRemoveDemographic(demographic)}
                  />
                </StyledDeleteTaxonomyItem>
              </StyledTaxonomyItemContainer>
            </div>
          );
        })}
      </div>

      <form onSubmit={handleSubmit(doAddDemographic)}>
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
