import React from "react";
import { useForm } from "react-hook-form";
import FormFieldset from "../../../../components/FormFieldset/FormFieldset";
import FormInput from "../../../../components/FormInput/FormInput";
import Button from "../../../../components/Button/Button";
const isEmpty = require("lodash/isEmpty");

const ServiceDetailsForm = ({
  onSubmit,
  defaultValues = {},
  formRef,
  setValidationPass
}) => {
  const { register, handleSubmit, errors } = useForm({
    defaultValues,
  });

  setValidationPass(false)

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} ref={formRef}>
        <FormFieldset
          label="Your service details"
          help="What you enter here will appear on your public facing service listing."
        >
          <FormInput
            name="name"
            type="text"
            label="Service name"
            register={register}
            error={errors.name}
            required
            help="This is how your service will be displayed to residents in the directory"
          />
          <FormInput
            name="description"
            type="text"
            label="Service description"
            register={register}
            error={errors.description}
            help="Can you describe your service in 80 characters (e.g Expert services so no-one has to face a mental health problem alone)"
          />
        </FormFieldset>
        <FormFieldset
          label="Contact details"
          help="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut imperdiet varius sapien."
        >
          <FormInput
            name="website"
            type="text"
            label="Website"
            register={register}
            error={errors.website}
            help="Please include a link to your contact page or equivalent"
          />
          <FormInput
            name="email"
            type="email"
            label="Email"
            register={register}
            error={errors.email}
            help="Ensure it is a business (not personal) email"
          />
          <FormInput
            name="telephone"
            type="tel"
            label="Phone number"
            register={register}
            error={errors.telephone}
            help="Ensure it is a business (not personal) number"
          />
        </FormFieldset>
        <FormFieldset
          label="Referral details"
          help="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut imperdiet varius sapien."
        >
          <FormInput
            name="referral_link"
            type="text"
            label="Referral link"
            register={register}
            error={errors.referral_link}
            help="If you have one you can include a referral form"
          />
          <FormInput
            name="referral_email"
            type="email"
            label="Referral email"
            register={register}
            error={errors.referral_email}
            help="Include a referral email if you have one"
          />
        </FormFieldset>
        <FormFieldset
          label="Social media"
          help="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut imperdiet varius sapien."
        >
          <FormInput
            name="facebook"
            type="text"
            label="Facebook"
            register={register}
            error={errors.facebook}
          />
          <FormInput
            name="twitter"
            type="text"
            label="Twitter"
            register={register}
            error={errors.twitter}
          />
          <FormInput
            name="instagram"
            type="text"
            label="Instagram"
            register={register}
            error={errors.instagram}
          />
          <FormInput
            name="linkedin"
            type="text"
            label="LinkedIn"
            register={register}
            error={errors.linkedin}
          />
        </FormFieldset>
        <Button
          type="submit"
          label="Continue ›"
        />
      </form>
    </>
  );
};

export default ServiceDetailsForm;
