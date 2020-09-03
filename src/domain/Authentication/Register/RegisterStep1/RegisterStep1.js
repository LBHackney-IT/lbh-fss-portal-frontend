import React from "react";
import { useForm } from "react-hook-form";
import FormInput from "../../../../components/FormInput/FormInput";
import FormCheckbox from "../../../../components/FormCheckbox/FormCheckbox";
import StyledButton from "../../../../components/Button/Button";
import { navigate } from "@reach/router";
import Cookies from "js-cookie";

const RegisterStep1 = () => {
  let defaultValues = {
    name: "",
    email: "",
  };

  if (Cookies.get("registerStep1Values")) {
    try {
      defaultValues = JSON.parse(Cookies.get("registerStep1Values"));
    } catch (err) {
      Cookies.remove("registerStep1Values");
    }
  }

  const { register, handleSubmit, errors } = useForm({
    defaultValues: defaultValues,
  });

  function onSubmit({ name, email, agreeToTerms }) {
    Cookies.set("registerStep1Values", {
      name: name,
      email: email,
      agreeToTerms: agreeToTerms,
    });

    navigate("/register/step-2");
  }

  return (
    <>
      <h1>Create an account</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          label="Your name"
          name="name"
          register={register}
          required
          maxLength={255}
          error={errors.name}
        />
        <FormInput
          label="Email"
          name="email"
          register={register}
          required
          maxLength={255}
          validate={{
            pattern: (value) => {
              return (
                value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i) ||
                "Enter a valid e-mail address"
              );
            },
          }}
          error={errors.email}
        />
        <FormCheckbox
          type="checkbox"
          label="I agree to the service terms and conditions"
          name="agreeToTerms"
          register={register}
          required
          error={errors.agreeToTerms}
        />
        <StyledButton type="submit" label="Create Account" />
      </form>
    </>
  );
};

export default RegisterStep1;
