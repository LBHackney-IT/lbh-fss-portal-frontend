import React from "react";
import UserForm from "../UserForm/UserForm";

const AddUser = () => {
  const onSubmit = () => {
    alert("Add user");
  };

  return (
    <>
      <h1>Add user</h1>
      <UserForm onSubmit={onSubmit} submitLabel="Create account" />
    </>
  );
};

export default AddUser;
