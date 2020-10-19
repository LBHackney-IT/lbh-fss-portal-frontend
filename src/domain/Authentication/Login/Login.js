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

const StyledButton = styled(Button)`
  width: 100%;
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
      toast.error("Unable to login.");
      navigate("/");
      return;
    }

    setIsLoading(true);

    const user = await AuthenticationService.me();

    setIsLoading(false);

    // // // - end

    // const user = await AuthenticationService.login(email, password);
    // // const isLoggedIn = await AuthenticationService.me();
    // const isLoggedIn = true;

    // setIsLoading(false);

    // if (!isLoggedIn) {
    //   toast.error("Unable to login.");
    //   navigate("/");
    //   return;
    // }

    if (user) {
      setUser(user);

      navigate("/organisation");
    } else {
      toast.error("Invalid username or password.");

      reset();

      emailRef.current.focus();
    }
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
        <Link to="/password">Forgot Password</Link>
      </form>
    </>
  );
};

export default Login;
