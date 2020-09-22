import React, { useState, useContext } from "react";
import UserForm from "../UserForm/UserForm";
import UserService from "../../../services/UserService/UserService";
import { navigate } from "@reach/router";
import { toast } from "react-toastify";
import RaisedCard from "../../../components/RaisedCard/RaisedCard";
import AccessDenied from "../../Error/AccessDenied/AccessDenied";
import UserContext from '../../../context/UserContext/UserContext'

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

  const { roles } = useContext(UserContext)[0];

  const accessPermission = roles.includes("viewer") || roles.includes("admin");

  return accessPermission ? (
    <>
      <h1>Add user</h1>
      <RaisedCard>
        <UserForm
          onSubmit={doAddUser}
          submitLabel="Create account"
          submitLoading={isLoading}
          showPassword={false}
        />
      </RaisedCard>
    </>
  ) : (
    <AccessDenied />
  );
};

export default AddUser;
