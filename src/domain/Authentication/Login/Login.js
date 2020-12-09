import React, { useState, useContext, useRef } from "react";
import { useForm } from "react-hook-form";
import { Link } from "@reach/router";
import AuthenticationService from "../../../services/AuthenticationService/AuthenticationService";
import { navigate } from "@reach/router";
import FormInput from "../../../components/FormInput/FormInput";
import Button from "../../../components/Button/Button";
import UserContext from "../../../context/UserContext/UserContext";
import { toast } from "react-toastify";
import styled from "styled-components";
import AppLoading from "../../../AppLoading";

const StyledButton = styled(Button)`
  width: 100%;
  margin-bottom: 20px;
`;

const Login = () => {
  const { register, handleSubmit, errors, reset } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const setUser = useContext(UserContext)[1];
  const emailRef = useRef();

  async function doLogin({ email, password }) {
    if (isLoading) return;

    setIsLoading(true);

    const isLoggedIn = await AuthenticationService.login(email, password);

    setIsLoading(false);

    if (!isLoggedIn) {
      toast.error("Username or password is incorrect.");
      navigate("/");
      return;
    }

    setIsLoading(true);

    const user = await AuthenticationService.me();

    setIsLoading(false);

    if (user) {
      setUser(user);

      navigate("/organisation");
    } else {
      toast.error("Invalid username or password.");

      reset();

      emailRef.current.focus();
    }
  }

  if (isLoading) {
    return <AppLoading />;
  }

  return (
    <>
      <h1>Login</h1>
      <form onSubmit={handleSubmit(doLogin)} data-testid="form">
        <FormInput
          label="Email"
          name="email"
          inputRef={emailRef}
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
          error={errors.email}
        />
        <FormInput
          label="Password"
          name="password"
          type="password"
          register={register}
          error={errors.password}
          required
        />
        <StyledButton type="submit" label="Login" disabled={isLoading} />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Link to="/register/step-1">Create an account</Link>
          <Link to="/password">Forgot Password</Link>
        </div>
      </form>
    </>
  );
};

export default Login;
