import React, { useState, useContext } from "react";
import UserForm from "../UserForm/UserForm";
import useUserFetch from "../../../hooks/useUserFetch/useUserFetch";
import UserContext from "../../../context/UserContext/UserContext";
import UserService from "../../../services/UserService/UserService";
import RaisedCard from "../../../components/RaisedCard/RaisedCard";
import { toast } from "react-toastify";
import { navigate } from "@reach/router";

function doCleanFormValues(user, formValues) {
  user.organisation_id = user.organisation.id;
  user.password = formValues.password;
  user.name = formValues.name;

  const fieldsToKeep = [
    "name",
    "status",
    "roles",
    "password",
    "created_at",
    "organisation_id",
  ];

  let newFormValues = {};

  Object.keys(user).forEach((key) => {
    if (fieldsToKeep.includes(key)) {
      newFormValues[key] = user[key];
    }
  });

  return newFormValues;
}

const MyAccount = (props) => {
  const localUser = useContext(UserContext)[0];

  const { user, isLoading: fetchIsLoading } = useUserFetch(localUser.id);

  const [editIsLoading, setEditIsLoading] = useState(false);

  const onSubmit = (formValues) => {
    async function doEditUser() {
      if (editIsLoading) return;

      setEditIsLoading(true);

      const cleanFormValues = doCleanFormValues(user, formValues);

      const newUser = await UserService.updateUser(
        localUser.id,
        cleanFormValues
      );

      setEditIsLoading(false);

      if (newUser) {
        toast.success(`Your account has been updated.`);

        navigate("/users");
      } else {
        toast.error("Unable to update account.");
      }
    }

    doEditUser();
  };

  if (fetchIsLoading) {
    return <div data-testid="loading">Loading</div>;
  }

  return (
    <>
      <h1>My account</h1>
      <RaisedCard>
        <UserForm
          onSubmit={onSubmit}
          defaultValues={{
            name: user.name || "",
            email: user.email || "",
            roles: user.roles || "",
          }}
          submitLoading={editIsLoading}
          showRoles={false}
          showEmail={false}
        />
      </RaisedCard>
    </>
  );
};

export default MyAccount;
