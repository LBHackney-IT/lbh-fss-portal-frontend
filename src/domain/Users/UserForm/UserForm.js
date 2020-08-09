import React from "react";
import { useForm } from "react-hook-form";
import PropTypes from "prop-types";

const UserForm = ({ onSubmit, submitLabel = "Save" }) => {
  const { register, handleSubmit } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="name">Name</label>
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
      <input type="submit" value={submitLabel} />
    </form>
  );
};

UserForm.propTypes = {
  onSubmit: PropTypes.func,
  submitLabel: PropTypes.string,
};

export default UserForm;
