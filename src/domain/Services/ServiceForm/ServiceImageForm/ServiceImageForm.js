import React, { useState } from "react";
import styled from "styled-components";
import FormFieldset from "../../../../components/FormFieldset/FormFieldset";
import Button from "../../../../components/Button/Button";
import { useForm } from "react-hook-form";
import { grey, green, red } from "../../../../settings";
import ImageUploader from "react-images-upload";
import { breakpoint } from "../../../../utils/breakpoint/breakpoint";

const StyledHelp = styled.p`
  color: ${grey[400]};
  margin: 5px 0 40px 0;
`;

const StyledImage = styled.img`
  height: auto;
  width: 200px;
  ${breakpoint("sm")`
    width: 300px;
  `}
  ${breakpoint("md")`
    width: 350px;
  `}
`;

const ServiceCategoriesForm = ({
  onSubmit,
  defaultValues = {},
  submitLoading = false,
}) => {
  const [image, setImage] = useState({});

  const { handleSubmit } = useForm({
    defaultValues,
  });

  function doRemoveImage(e) {
    e.preventDefault();
    setImage({});
  }

  function doAddImage(picture) {
    console.log(picture);
    setImage({ file: URL.createObjectURL(picture[0]) });
    console.log("Add image");
  }

  console.log(image);

  return (
    <form onSubmit={handleSubmit(() => onSubmit(image))}>
      <FormFieldset label="Add an image">
        <p>
          Upload a picture to show residents what you do. This will be displayed
          on your listing.
        </p>
        {image.file ? (
          <>
            <div>
              <StyledImage src={image.file} />{" "}
            </div>
            <Button
              onClick={(e) => doRemoveImage(e)}
              label="Remove"
              margin="20px 0 0 0"
              color={red[400]}
              padding="5px 10px"
            />
          </>
        ) : (
          <ImageUploader
            withIcon={false}
            withLabel={false}
            singleImage={true}
            buttonText="Upload Image"
            onChange={doAddImage}
            imgExtension={[".jpg", ".gif", ".png", ".gif"]}
            maxFileSize={5242880}
            fileContainerStyle={{
              backgroundColor: "transparents",
              display: "block",
              padding: "0",
              margin: "0",
              boxShadow: "none",
            }}
            buttonStyles={{
              backgroundColor: "white",
              color: green[400],
              border: `1px solid ${green[400]}`,
              borderRadius: "3px",
              padding: "15px",
              borderBottom: "2px solid black",
            }}
          />
        )}
        {!image.file ? (
          <StyledHelp>
            Files supported: JPG, JPEG or PNG <br />
            Max file size: tbc mb
          </StyledHelp>
        ) : null}
      </FormFieldset>
      <Button
        type="submit"
        label="Submit service"
        disabled={submitLoading}
        padding="15px"
      />
    </form>
  );
};

export default ServiceCategoriesForm;
