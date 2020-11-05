import React, { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import FormInput from "../../../../components/FormInput/FormInput";
import Button from "../../../../components/Button/Button";
import styled from "styled-components";
import { Link, navigate } from "@reach/router";
import AuthenticationService from "../../../../services/AuthenticationService/AuthenticationService";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import FormError from "../../../../components/FormError/FormError";

const StyledButton = styled(Button)`
  width: 100%;
  margin-bottom: 20px;
`;

const RegisterStep3 = () => {
  // initalise form default values
  let defaultValues = {
    email: "",
    code: "",
  };

  let registerStep1Values = {};

  // fetch email value from cookie, if cookie exists
  if (Cookies.get("registerStep1Values")) {
    try {
      registerStep1Values = JSON.parse(Cookies.get("registerStep1Values"));
      defaultValues.email = registerStep1Values.email;
    } catch (err) {
      Cookies.remove("registerStep1Values");
    }
  }

  // initalise form with default values
  const {
    register,
    handleSubmit,
    errors,
    getValues,
    setValue,
    clearErrors,
  } = useForm({
    defaultValues: defaultValues,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [emailValidationStatus, setEmailValidationStatus] = useState("pass");

  // define function to trigger on form submission
  async function doRegisterConfirmation({ email, code }) {
    setIsLoading(true);

    const isRegistered = await AuthenticationService.registerConfirmation(
      email,
      code
    );

    setIsLoading(false);

    if (isRegistered) {
      toast.success("Account successfully created.");
      Cookies.remove("registerStep1Values");
      navigate("/");
    } else {
      toast.error("Registration failed.");
    }
  }

  // define function to trigger on 'Resend confirmation code' button click
  async function doResendRegisterConfirmation(e, email) {
    e.preventDefault();
    setValue("code", "");
    clearErrors();

    if (email.length === 0) {
      setEmailValidationStatus("missing");
      return false;
    } else if (email.length > 255) {
      setEmailValidationStatus("exceedMaxLength");
      return false;
    } else if (!email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i)) {
      setEmailValidationStatus("invalidPattern");
      return false;
    } else {
      setEmailValidationStatus("pass");
    }

    setIsLoading(true);

    const responseSuccess = await AuthenticationService.resendRegisterConfirmation(
      email
    );

    setIsLoading(false);

    if (responseSuccess) {
      toast.success(`A confirmation code has been re-sent to ${email}.`);
    } else {
      toast.error(`Failed to re-send a confirmation code to ${email}.`);
    }
  }

  return (
    <>
      <h1>Enter confirmation code</h1>
      <form onSubmit={handleSubmit(doRegisterConfirmation)}>
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
        {emailValidationStatus === "missing" ? (
          <FormError error={"Email is required"} />
        ) : null}
        {emailValidationStatus === "exceedMaxLength" ? (
          <FormError error={"Max length exceeded."} />
        ) : null}
        {emailValidationStatus === "invalidPattern" ? (
          <FormError error={"Enter a valid e-mail address"} />
        ) : null}
        <FormInput
          label="Code"
          name="code"
          register={register}
          required
          error={errors.code}
        />
        <StyledButton type="submit" label="Submit" disabled={isLoading} />
        <div style={{ marginTop: "20px" }}>
          <Link
            to="/"
            onClick={(e) => doResendRegisterConfirmation(e, getValues().email)}
            style={{ textDecoration: "none", fontWeight: "bold" }}
          >
            Resend confirmation code
          </Link>
        </div>
        <div style={{ marginTop: "20px" }}>
          <Link to="/">Go back to login</Link>
        </div>
      </form>
    </>
  );
};

export default RegisterStep3;
