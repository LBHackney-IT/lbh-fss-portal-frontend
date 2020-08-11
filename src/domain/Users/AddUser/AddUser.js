import React, { useState } from "react";
import UserForm from "../UserForm/UserForm";
import UserService from "../../../services/UserService/UserService";
import { navigate } from "@reach/router";

const AddUser = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  async function doAddUser({ name, email, organisationName, roles }) {
    if (isLoading) return;

    setIsLoading(true);

    const user = await UserService.addUser({
      name,
      email,
      organisationName,
      roles,
    });

    setIsLoading(false);

    if (user) {
      navigate("/users", {
        state: {
          data: {
            redirectMessage: {
              type: "success",
              message: `New user ${user.name} invited.`,
            },
          },
        },
      });
    } else {
      setErrorMessage("Unable to add user.");
    }
  }

  return (
    <>
      <h1>Add user</h1>
      <UserForm
        onSubmit={doAddUser}
        submitLabel="Create account"
        submitDisabled={isLoading}
        errorMessage={errorMessage}
      />
    </>
  );
};

export default AddUser;
