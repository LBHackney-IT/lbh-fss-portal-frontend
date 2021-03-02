import React, {useState} from "react";
import { useForm } from "react-hook-form";
import FormFieldset from "../../../../components/FormFieldset/FormFieldset";
import FormInput from "../../../../components/FormInput/FormInput";
import Button from "../../../../components/Button/Button";
import FormTextbox from "../../../../components/FormTextbox/FormTextbox";
import FormHelpText from "../../../../components/FormHelpText/FormHelpText";
import { Link } from "@reach/router";

const ServiceDetailsForm = ({
  onSubmit,
  defaultValues = {},
  goBackToPreviousStep,
  isInternalTeam,
}) => {
  const { register, handleSubmit, errors } = useForm({
    defaultValues,
  });

  const [count, setCount] = useState(0);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormFieldset
        label="Your details"
        help="What you enter here will appear on your public-facing listing."
      >
        <FormInput
          name="name"
          type="text"
          label="Organisation name"
          register={register}
          error={errors.name}
          maxLength={255}
          required
          help="This is how you will be displayed on the website"
        />
        <FormTextbox
          name="description"
          label="Organisation description"
          register={register}
          maxLength={400}
          required
          error={errors.description}
          help='Please describe your organisation in 400 characters (e.g "Expert services so no-one has to face a mental health problem alone")'
          textAreaStyle={{ margin: "0" }}
          count={count}
          setCount={setCount}
          showCounter={true}
        />
        <FormHelpText helpText="Please review underlined spellings." />
      </FormFieldset>
      <FormFieldset
        label="Contact details"
        help="To make sure your listing has the most up to date information, please add the appropriate details below."
      >
        <FormInput
          name="website"
          type="text"
          label="Website"
          register={register}
          error={errors.website}
          maxLength={255}
          validate={{
            pattern: (value) => {
              const expression = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
              const regex = new RegExp(expression);
              if (value === "") return true;
              return value.match(regex) || "Enter a valid URL";
            },
          }}
          help="Please include a link to your contact page or equivalent"
        />
        <FormInput
          name="email"
          label="Email"
          register={register}
          error={errors.email}
          maxLength={255}
          validate={{
            pattern: (value) => {
              if (value === "") return true;
              return (
                value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,11}$/i) ||
                "Enter a valid e-mail address"
              );
            },
          }}
          help="Ensure it is a business (not personal) email"
        />
        <FormInput
          name="telephone"
          type="tel"
          label="Phone number"
          register={register}
          maxLength={255}
          error={errors.telephone}
          help="Ensure it is a business (not personal) number"
        />
      </FormFieldset>
      <FormFieldset
        label="Referral details"
        help="This is for health and care professionals who may want to make a more formal referral to you."
      >
        <FormInput
          name="referral_link"
          type="text"
          label="Referral link"
          register={register}
          validate={{
            pattern: (value) => {
              const expression = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
              const regex = new RegExp(expression);
              if (value === "") return true;
              return value.match(regex) || "Enter a valid URL";
            },
          }}
          error={errors.referral_link}
          help="If you have one you can include a referral form"
        />
        <FormInput
          name="referral_email"
          label="Referral email"
          register={register}
          maxLength={255}
          validate={{
            pattern: (value) => {
              if (value === "") return true;
              return (
                value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,11}$/i) ||
                "Enter a valid e-mail address"
              );
            },
          }}
          error={errors.referral_email}
          help="Include a referral email if you have one"
        />
      </FormFieldset>
      <FormFieldset
        label="Social media"
        help="Add links to your social media channels that are regularly updated."
      >
        <FormInput
          name="facebook"
          type="text"
          label="Facebook"
          maxLength={255}
          register={register}
          validate={{
            pattern: (value) => {
              const expression = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
              const regex = new RegExp(expression);
              if (value === "") return true;
              return value.match(regex) || "Enter a valid URL";
            },
          }}
          error={errors.facebook}
        />
        <FormInput
          name="twitter"
          type="text"
          label="Twitter"
          maxLength={255}
          register={register}
          validate={{
            pattern: (value) => {
              const expression = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
              const regex = new RegExp(expression);
              if (value === "") return true;
              return value.match(regex) || "Enter a valid URL";
            },
          }}
          error={errors.twitter}
        />
        <FormInput
          name="instagram"
          type="text"
          label="Instagram"
          maxLength={255}
          register={register}
          validate={{
            pattern: (value) => {
              const expression = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
              const regex = new RegExp(expression);
              if (value === "") return true;
              return value.match(regex) || "Enter a valid URL";
            },
          }}
          error={errors.instagram}
        />
        <FormInput
          name="linkedin"
          type="text"
          label="LinkedIn"
          maxLength={255}
          register={register}
          validate={{
            pattern: (value) => {
              const expression = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
              const regex = new RegExp(expression);
              if (value === "") return true;
              return value.match(regex) || "Enter a valid URL";
            },
          }}
          error={errors.linkedin}
        />
      </FormFieldset>
      <Button type="submit" label="Continue ›" />
      {isInternalTeam ? (
        <div style={{ marginTop: "20px" }}>
          <Link to="/" onClick={(e) => goBackToPreviousStep(e)}>
            Go back to previous step
          </Link>
        </div>
      ) : null}
    </form>
  );
};

export default ServiceDetailsForm;
