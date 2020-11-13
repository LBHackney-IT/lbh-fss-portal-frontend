import React, { useState } from "react";
import Button from "../../../components/Button/Button";
import FormInput from "../../../components/FormInput/FormInput";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import AuthenticationService from "../../../services/AuthenticationService/AuthenticationService";
import { toast } from "react-toastify";
import { Link, navigate } from "@reach/router";
import AppLoading from "../../../AppLoading";

const StyledButton = styled(Button)`
  width: 100%;
  margin: 0;
`;

function InvitationResetPassword() {
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, errors } = useForm();

  async function doResetPassword({ email, temporaryPassword, newPassword }) {
    setIsLoading(true);

    const resetPasswordSuccess = await AuthenticationService.invitationConfirmation(
      email,
      temporaryPassword,
      newPassword
    );

    setIsLoading(false);

    if (resetPasswordSuccess) {
      toast.success("Password successfully set.");
      navigate("/");
    } else {
      toast.error("Password failed to update.");
    }
  }

  if (isLoading) {
    return <AppLoading />;
  }

  return (
    <>
      <h1>Create new password</h1>
      <form onSubmit={handleSubmit(doResetPassword)}>
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

        <FormInput
          label="Temporary password"
          name="temporaryPassword"
          register={register}
          required
          error={errors.temporaryPassword}
        />

        <FormInput
          type="password"
          label="Password"
          name="newPassword"
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
          autoComplete="new-password"
          error={errors.newPassword}
        />

        <StyledButton type="submit" label="Set password" />
        <div style={{ marginTop: "20px" }}>
          <Link to="/">Go back to login</Link>
        </div>
      </form>
    </>
  );
}

export default InvitationResetPassword;
