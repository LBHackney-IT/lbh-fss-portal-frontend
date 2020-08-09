import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "@reach/router";
import AuthenticationService from "../../../services/AuthenticationService/AuthenticationService";
import { navigate } from "@reach/router";
import Input from "../../../components/Input/Input";
import Button from "../../../components/Button/Button";
import StatusMessage from "../../../components/StatusMessage/StatusMessage";

const Login = () => {
  const { register, handleSubmit, errors } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  async function doLogin({ email, password }) {
    if (isLoading) return;

    setIsLoading(true);

    const loginSuccess = await AuthenticationService.login(email, password);

    setIsLoading(false);

    if (loginSuccess) {
      navigate("/services");
    } else {
      setErrorMessage("Invalid email or password.");
    }
  }

  return (
    <>
      <h1>Login</h1>
      {errorMessage ? (
        <StatusMessage type="error" message={errorMessage} />
      ) : (
        ""
      )}
      <form onSubmit={handleSubmit(doLogin)}>
        <Input
          name="email"
          type="email"
          register={register}
          error={errors.email}
          required
        />
        <Input
          name="password"
          type="password"
          register={register}
          error={errors.password}
          required
        />
        <Button type="submit" label="Login" disabled={isLoading} />
        <Link to="/password">Forgot Password</Link>
      </form>
    </>
  );
};

export default Login;
