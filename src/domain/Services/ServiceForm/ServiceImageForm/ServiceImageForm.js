import React from "react";
import styled from "styled-components";
import FormFieldset from "../../../../components/FormFieldset/FormFieldset";
import Button from "../../../../components/Button/Button";
import { useForm } from "react-hook-form";
import { grey } from "../../../../settings";

const StyledHelp = styled.p`
  color: ${grey[400]};
`;

const ServiceCategoriesForm = ({
  onSubmit,
  defaultValues = {},
  submitLoading = false,
}) => {
  const { handleSubmit } = useForm({
    defaultValues,
  });

  function doAddImage(e) {
    e.preventDefault();
    console.log("Add image");
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormFieldset label="Add an image">
        <p>
          Upload a picture to show residents what you do. This will be displayed
          on your listing.
        </p>
        <Button
          onClick={(e) => doAddImage(e)}
          label="Upload image"
          margin="50px 0 0 0"
        />
        <StyledHelp>
          Files supported: JPG, JPEG or PNG <br />
          Max file size: tbc mb
        </StyledHelp>
      </FormFieldset>
      <Button type="submit" label="Submit service" disabled={submitLoading} />
    </form>
  );
};

export default ServiceCategoriesForm;
