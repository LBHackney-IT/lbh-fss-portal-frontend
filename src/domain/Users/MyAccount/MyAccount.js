import React, { useState, useContext } from "react";
import UserForm from "../UserForm/UserForm";
import useUserFetch from "../../../hooks/useUserFetch/useUserFetch";
import UserContext from "../../../context/UserContext/UserContext";
import UserService from "../../../services/UserService/UserService";
import RaisedCard from "../../../components/RaisedCard/RaisedCard";
import { toast } from "react-toastify";
import { navigate } from "@reach/router";

const MyAccount = (props) => {
  const localUser = useContext(UserContext)[0];

  const { user, isLoading: fetchIsLoading } = useUserFetch(localUser.id);

  const [editIsLoading, setEditIsLoading] = useState(false);

  const onSubmit = (formValues) => {
    async function doEditUser() {
      if (editIsLoading) return;

      setEditIsLoading(true);

      const newUser = await UserService.updateUser(localUser.id, formValues);

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
    return "Loading";
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
        />
      </RaisedCard>
    </>
  );
};

export default MyAccount;
