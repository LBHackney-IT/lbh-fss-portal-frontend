import React, { useState } from "react";
import styled from "styled-components";
import FormFieldset from "../../../../components/FormFieldset/FormFieldset";
import Button from "../../../../components/Button/Button";
import { useForm } from "react-hook-form";
import { grey, green, red } from "../../../../settings";
import ImageUploader from "react-images-upload";
import { breakpoint } from "../../../../utils/breakpoint/breakpoint";
import { toast } from "react-toastify";
import AppLoading from "../../../../AppLoading";

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
  if (defaultValues.image) {
    defaultValues.image.preview = defaultValues.image.medium;
  }

  const [image, setImage] = useState(defaultValues.image || {});

  const { handleSubmit } = useForm({
    defaultValues,
  });

  function doRemoveImage(e) {
    e.preventDefault();
    setImage({});
  }

  function doAddImage(picture) {
    if (picture.length !== 0) {
      setImage({ file: picture[0], preview: URL.createObjectURL(picture[0]) });
    }
  }

  if (submitLoading) {
    return <AppLoading />;
  }

  return (
    <form
      onSubmit={handleSubmit(() => onSubmit({ image: image.file || null }))}
    >
      <FormFieldset label="Add an image">
        <p>
          Upload a picture to show residents what you do. This will be displayed
          on your listing.
        </p>
        {image.preview ? (
          <>
            <div>
              <StyledImage src={image.preview} />{" "}
            </div>
            <Button
              onClick={(e) => doRemoveImage(e)}
              label="Remove"
              margin="20px 0 0 0"
              backgroundColor={red[400]}
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
            imgExtension={[".jpg", ".jpeg", ".png"]}
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
            errorStyle={{ fontSize: "15px" }}
          />
        )}
        {!image.preview ? (
          <StyledHelp>
            Upload a landscape image to ensure it displays correctly.
            <br />
            <br />
            Files supported: JPG, JPEG or PNG <br />
            <br />
            Max file size: 5MB
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
