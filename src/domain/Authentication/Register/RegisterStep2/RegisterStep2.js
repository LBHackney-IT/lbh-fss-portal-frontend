import React, { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import FormInput from "../../../../components/FormInput/FormInput";
import StyledButton from "../../../../components/Button/Button";
import { navigate, Redirect } from "@reach/router";
import UserContext from "../../../../context/UserContext/UserContext";
import AuthenticationService from "../../../../services/AuthenticationService/AuthenticationService";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

const RegisterStep2 = () => {
  const { register, handleSubmit, errors, getValues } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const setUser = useContext(UserContext)[1];

  function removeCookieAndRedirect() {
    Cookies.remove("registerStep1Values");
    setTimeout(() => {
      navigate("/register/step-1");
    }, 0);
  }

  let registerStep1Values = {};

  if (Cookies.get("registerStep1Values")) {
    try {
      registerStep1Values = JSON.parse(Cookies.get("registerStep1Values"));
    } catch (err) {
      removeCookieAndRedirect();
    }
  }

  async function onRegister({ password }) {
    if (
      registerStep1Values.name.length > 255 ||
      registerStep1Values.name.length === 0 ||
      registerStep1Values.email.length > 255 ||
      registerStep1Values.email.match(
        /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
      )
    ) {
      toast.error("Registration failed.");
      removeCookieAndRedirect();
      return false;
    }

    setIsLoading(true);

    const user = await AuthenticationService.register(
      registerStep1Values.name,
      registerStep1Values.email,
      password
    );

    setIsLoading(false);

    if (!registerStep1Values.agreeToTerms) {
      toast.error("Please agree to the service terms and conditions.");
      navigate("/register/step-1");
    } else if (user) {
      setUser(user);
      Cookies.remove("registerStep1Values");
      navigate("/services");
    } else {
      toast.error("Registration failed.");
      navigate("/register/step-1");
    }
  }

  return (
    <>
      {!Cookies.get("registerStep1Values") ? (
        <Redirect to="/register/step-1" noThrow />
      ) : (
        <>
          <h1>Create your password</h1>
          <form onSubmit={handleSubmit(onRegister)}>
            <FormInput
              type="password"
              label="Password"
              name="password"
              register={register}
              required
              maxLength={255}
              minLength={6}
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
              }}
              error={errors.password}
            />
            <FormInput
              type="password"
              label="Confirm password"
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
            <StyledButton
              type="submit"
              label="Create Password"
              disabled={isLoading}
            />
          </form>
        </>
      )}
    </>
  );
};

export default RegisterStep2;
