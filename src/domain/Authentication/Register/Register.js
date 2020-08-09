import React from "react";
import { useForm } from "react-hook-form";

const Register = () => {
  const { register, handleSubmit } = useForm();

  async function doRegister() {
    alert("register");
  }

  return (
    <>
      <h1>Register</h1>

      <form onSubmit={handleSubmit(doRegister)}>
        <label htmlFor="name">Your name</label>
        <input
          name="name"
          type="text"
          ref={register({ required: true, maxLength: 255 })}
        />
        <label htmlFor="email">Email</label>
        <input
          name="email"
          type="email"
          ref={register({ required: true, maxLength: 255 })}
        />
        <input type="submit" value="Create Account" />
      </form>
    </>
  );
};

export default Register;
