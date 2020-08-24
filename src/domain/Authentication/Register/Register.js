import React, { useState } from "react";
import { useForm } from "react-hook-form";
import FormInput from "../../../components/FormInput/FormInput";
import FormCheckbox from "../../../components/FormCheckbox/FormCheckbox";
import StyledButton from "../../../components/Button/Button";
import { flexRender } from "react-table/dist/react-table.development";
import { Link } from "@reach/router";

const Register = () => {
  const { register, handleSubmit, errors, reset } = useForm();
  const [isLoading, setIsLoading] = useState(false);

  async function doRegister() {
    alert("register");
  }

  return (
    <>
      <h1>Create an account</h1>
      <form onSubmit={handleSubmit(doRegister)}>
        <FormInput
          label="Your name"
          name="name"
          register={register}
          required
          maxLength={255}
          error={errors.name}
        />
        <FormInput
          label="Organisation"
          name="organisation"
          register={register}
          required
          maxLength={255}
          error={errors.organisation}
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
        <StyledButton type="submit" label="Login" disabled={isLoading} />
      </form>
    </>
  );
};

export default Register;
