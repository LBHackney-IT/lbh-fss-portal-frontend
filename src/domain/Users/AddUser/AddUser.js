import React, { useState } from "react";
import UserForm from "../UserForm/UserForm";
import UserService from "../../../services/UserService/UserService";
import { navigate } from "@reach/router";
import { toast } from "react-toastify";

const AddUser = () => {
  const [isLoading, setIsLoading] = useState(false);

  async function doAddUser(formValues) {
    if (isLoading) return;

    setIsLoading(true);

    const user = await UserService.createUser(formValues);

    setIsLoading(false);

    if (user) {
      toast.success(`New user ${user.name} invited.`);

      navigate("/users");
    } else {
      toast.error("Unable to add user.");
    }
  }

  return (
    <>
      <h1>Add user</h1>
      <UserForm
        onSubmit={doAddUser}
        submitLabel="Create account"
        submitLoading={isLoading}
        showPassword={false}
      />
    </>
  );
};

export default AddUser;
