import React from "react";
import UserForm from "../UserForm/UserForm";

const MyAccount = () => {
  const onSubmit = () => {
    alert("My account");
  };

  return (
    <>
      <h1>My account</h1>
      <UserForm onSubmit={onSubmit} />
    </>
  );
};

export default MyAccount;
