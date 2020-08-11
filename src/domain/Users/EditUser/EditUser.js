import React, { useState, useEffect } from "react";
import UserForm from "../UserForm/UserForm";
import UserService from "../../../services/UserService/UserService";
import { toast } from "react-toastify";
import { navigate } from "@reach/router";

const EditUser = (props) => {
  const [user, setUser] = useState(false);
  const [fetchIsLoading, setFetchIsLoading] = useState(true);
  const [editIsLoading, setEditIsLoading] = useState(false);

  useEffect(() => {
    async function fetchUser() {
      const newUser = await UserService.getUser(props.userId);

      if (newUser) {
        setUser(newUser);

        setFetchIsLoading(false);
      } else {
        toast.error("Unable to find user.");

        navigate("/users");
      }
    }

    fetchUser();
  }, [props.userId, setUser, setFetchIsLoading]);

  const onSubmit = (formValues) => {
    async function doEditUser() {
      if (editIsLoading) return;

      setEditIsLoading(true);

      const newUser = await UserService.updateUser(props.userId, formValues);

      setEditIsLoading(false);

      if (newUser) {
        toast.success(`User ${newUser.name} updated.`);

        navigate("/users");
      } else {
        toast.error("Unable to edit user.");
      }
    }

    doEditUser();
  };

  if (fetchIsLoading) {
    return "Loading";
  }

  return (
    <>
      <h1>Edit user</h1>
      <UserForm
        onSubmit={onSubmit}
        defaultValues={{
          name: user.name || "",
          email: user.email || "",
          organisationName: user.organisation.name || "",
          roles: user.roles || "",
        }}
        submitDisabled={editIsLoading}
      />
    </>
  );
};

export default EditUser;
