import React from "react";
import { useForm } from "react-hook-form";

const UserForm = ({ onSubmit, submitLabel = "Save" }) => {
  const { register, handleSubmit } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label for="name">Name</label>
      <input
        name="name"
        type="text"
        ref={register({ required: true, maxLength: 255 })}
      />
      <label for="email">Email</label>
      <input
        name="email"
        type="email"
        ref={register({ required: true, maxLength: 255 })}
      />
      <input type="submit" value={submitLabel} />
    </form>
  );
};

export default UserForm;
