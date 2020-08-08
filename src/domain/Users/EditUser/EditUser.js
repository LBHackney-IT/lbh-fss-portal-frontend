import React from "react";
import UserForm from "../UserForm/UserForm";

const EditUser = () => {
  const onSubmit = () => {
    alert("Edit user");
  };

  return (
    <>
      <h1>Edit user</h1>
      <UserForm onSubmit={onSubmit} />
    </>
  );
};

export default EditUser;
