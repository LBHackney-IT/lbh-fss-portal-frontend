import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const Register = () => {
  const { register, handleSubmit, errors } = useForm();

  async function doRegister(formValues) {
    toast.success(`Hello ${formValues.name}`);
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
        {errors.name && errors.name.type === "required" && (<p>Please enter a name</p>)}
        {errors.name && errors.name.type === "maxLength" && (<p>Maximum length is 255 characters</p>)}
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
