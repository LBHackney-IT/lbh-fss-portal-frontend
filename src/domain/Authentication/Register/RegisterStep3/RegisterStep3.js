import React, { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import FormInput from "../../../../components/FormInput/FormInput";
import StyledButton from "../../../../components/Button/Button";
import { navigate, Redirect } from "@reach/router";
import UserContext from "../../../../context/UserContext/UserContext";
import AuthenticationService from "../../../../services/AuthenticationService/AuthenticationService";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

const RegisterStep3 = () => {
  let defaultValues = {
    email: "",
    code: "",
  };

  let registerStep1Values = {};

  if (Cookies.get("registerStep1Values")) {
    try {
      registerStep1Values = JSON.parse(Cookies.get("registerStep1Values"));
      defaultValues.email = registerStep1Values.email;
    } catch (err) {
      Cookies.remove("registerStep1Values");
    }
  }

  const { register, handleSubmit, errors } = useForm({
    defaultValues: defaultValues,
  });
  const [isLoading, setIsLoading] = useState(false);
  const setUser = useContext(UserContext)[1];

  async function doRegisterConfirmation({ email, code }) {
    setIsLoading(true);

    const user = await AuthenticationService.registerConfirmation(email, code);

    setIsLoading(false);

    if (user) {
      setUser(user);
      Cookies.remove("registerStep1Values");
      navigate("/services");
    } else {
      toast.error("Registration failed.");
    }
  }

  return (
    <>
      <h1>Enter confirmation</h1>
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
        <FormInput
          label="Code"
          name="code"
          register={register}
          error={errors.code}
        />
        <StyledButton type="submit" label="Submit" disabled={isLoading} />
      </form>
    </>
  );
};

export default RegisterStep3;
