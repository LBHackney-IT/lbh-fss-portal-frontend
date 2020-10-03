import React, { useState, useContext } from "react";
import UserForm from "../UserForm/UserForm";
import UserService from "../../../services/UserService/UserService";
import { navigate } from "@reach/router";
import { toast } from "react-toastify";
import RaisedCard from "../../../components/RaisedCard/RaisedCard";
import AccessDenied from "../../Error/AccessDenied/AccessDenied";
import UserContext from "../../../context/UserContext/UserContext";
import { checkIsInternalTeam } from "../../../utils/functions/functions";

const AddUser = () => {
  const [isLoading, setIsLoading] = useState(false);

  async function doAddUser(formValues) {
    if (isLoading) return;

    formValues.created_at = new Date();

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

  const isInternalTeam = checkIsInternalTeam(roles);

  return isInternalTeam ? (
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
