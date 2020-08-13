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

    const user = await AuthenticationService.login(email, password);

    setIsLoading(false);

    if (user) {
      setUser(user);

      navigate("/services");
    } else {
      toast.error("Invalid username or password.");

      reset();

      emailRef.current.focus();
    }
  }

  return (
    <>
      <h1>Login</h1>
      <form onSubmit={handleSubmit(doLogin)}>
        <FormInput
          label="Email"
          name="email"
          type="email"
          inputRef={emailRef}
          register={register}
          error={errors.email}
          required
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
