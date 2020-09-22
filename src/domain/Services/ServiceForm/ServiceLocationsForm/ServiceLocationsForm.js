import React from "react";
import FormFieldset from "../../../../components/FormFieldset/FormFieldset";
import Button from "../../../../components/Button/Button";
import { useForm } from "react-hook-form";
import FormInput from "../../../../components/FormInput/FormInput";

const ServiceLocationsForm = ({ onSubmit, defaultValues = {} }) => {
  const { register, handleSubmit, errors } = useForm({
    defaultValues,
  });

  function doFindAddress() {
    console.log("Find address");
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormFieldset
        label="Service location(s)"
        help="This will be where your service(s) are located on the map. If you offer a remote service you get put in your HQ"
      ></FormFieldset>
      {/* //TODO: find postcode validation pattern */}
      <FormInput
        name="postcode"
        type="text"
        label="Postcode"
        register={register}
        error={errors.postcode}
        required
      />
      <Button onClick={doFindAddress} label="Find address" />
      {/* add some condition to prevent progress until address is found */}
      <Button type="submit" label="Continue ›" />
    </form>
  );
};

export default ServiceLocationsForm;
