import React, { useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import FormInput from "../../../components/FormInput/FormInput";
import Button from "../../../components/Button/Button";
import AuthenticationService from "../../../services/AuthenticationService/AuthenticationService";
import { toast } from "react-toastify";
import { Link, navigate } from "@reach/router";
import Cookies from "js-cookie";

const StyledButton = styled(Button)`
  width: 100%;
  margin: 0;
`;

const ResetPasswordConfirmation = () => {
  const [isLoading, setIsLoading] = useState(false);

  let defaultValues = {
    email: "",
    code: "",
    password: "",
    confirmPassword: "",
  };

  if (Cookies.get("passwordReset")) {
    try {
      const cookie = JSON.parse(Cookies.get("passwordReset"));
      defaultValues.email = cookie.email;
    } catch (err) {
      Cookies.remove("passwordReset");
    }
  }

  const { register, handleSubmit, getValues, errors, reset } = useForm({
    defaultValues: defaultValues,
  });

  async function doPasswordResetConfirmation({ email, code, password }) {
    if (isLoading) return;

    setIsLoading(true);

    const user = await AuthenticationService.passwordRecoveryConfirmation(
      email,
      code,
      password
    );

    setIsLoading(false);

    if (user) {
      toast.success("New password successfully set.");

      navigate("/");
    } else {
      reset();

      toast.error("Password reset failed.");
    }

    Cookies.remove("passwordReset");
  }

  return (
    <>
      <h1>Password reset confirmation</h1>

      <form onSubmit={handleSubmit(doPasswordResetConfirmation)}>
        <FormInput
          label="Email"
          name="email"
          register={register}
          required
          validate={{
            pattern: (value) => {
              return (
                value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i) ||
                "Enter a valid e-mail address"
              );
            },
          }}
          maxLength={255}
          error={errors.email}
        />
        <FormInput
          label="Code"
          name="code"
          register={register}
          required
          maxLength={255}
          error={errors.code}
        />
        <FormInput
          type="password"
          label="New password"
          name="password"
          register={register}
          required
          maxLength={255}
          minLength={8}
          validate={{
            oneCapital: (value) => {
              return (
                value.match(/[[A-Z]/) ||
                "Password must contain at least one capital letter"
              );
            },
            oneNumber: (value) => {
              return (
                value.match(/[[0-9]/) ||
                "Password must contain at least one number"
              );
            },
            oneSpecialCharacter: (value) => {
              return (
                value.match(/[@#$%^&+='!£*(/`~)]/) ||
                "Password must contain at least one special character"
              );
            },
          }}
          error={errors.password}
        />
        <FormInput
          type="password"
          label="Confirm new password"
          name="confirmPassword"
          register={register}
          validate={{
            passwordMatch: (value) => {
              return (
                value === getValues().password || "Passwords should match."
              );
            },
          }}
          error={errors.confirmPassword}
        />
        <StyledButton type="submit" label="Submit" />
        <div style={{ marginTop: "20px" }}>
          <Link to="/">Go back to login</Link>
        </div>
      </form>
    </>
  );
};

export default ResetPasswordConfirmation;
