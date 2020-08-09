import React from "react";
import { useForm } from "react-hook-form";

const ResetPassword = () => {
  const { register, handleSubmit } = useForm();

  async function doPasswordReset() {
    alert("reset");
  }

  return (
    <>
      <h1>Reset your password</h1>

      <form onSubmit={handleSubmit(doPasswordReset)}>
        <label htmlFor="email">Email</label>
        <input name="email" type="email" ref={register({ required: true })} />
        <input type="submit" value="Submit" />
      </form>
    </>
  );
};

export default ResetPassword;
