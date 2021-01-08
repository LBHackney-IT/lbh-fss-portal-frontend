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

const ResetPassword = () => {
  const { register, handleSubmit, errors } = useForm();
  const [isLoading, setIsLoading] = useState(false);

  async function doPasswordReset({ email }) {
    if (isLoading) return;

    setIsLoading(true);

    const user = await AuthenticationService.passwordRecovery(email);

    setIsLoading(false);

    toast.success(
      `An email containing password reset instruction has been sent to ${email}.`
    );

    if (user) {
      Cookies.set("passwordReset", {
        email: email,
      });
      navigate("/password/reset");
    }
  }

  return (
    <>
      <h1>Reset your password</h1>

      <form onSubmit={handleSubmit(doPasswordReset)}>
        <FormInput
          label="Email"
          name="email"
          register={register}
          required
          validate={{
            pattern: (value) => {
              return (
                value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,11}$/i) ||
                "Enter a valid e-mail address"
              );
            },
          }}
          maxLength={255}
          error={errors.email}
        />
        <StyledButton type="submit" label="Submit" />
        <div style={{ marginTop: "20px" }}>
          <Link to="/">Go back to login</Link>
        </div>
      </form>
    </>
  );
};

export default ResetPassword;
