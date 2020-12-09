import React, { useState, useContext } from "react";
import UserForm from "../UserForm/UserForm";
import UserService from "../../../services/UserService/UserService";
import { navigate } from "@reach/router";
import { toast } from "react-toastify";
import RaisedCard from "../../../components/RaisedCard/RaisedCard";
import AccessDenied from "../../Error/AccessDenied/AccessDenied";
import UserContext from "../../../context/UserContext/UserContext";
import { checkIsInternalTeam } from "../../../utils/functions/functions";

function doCleanFormValues(formValues) {
  let newFormValues = formValues;

  newFormValues.created_at = new Date();
  newFormValues.status = "invited";

  return newFormValues;
}

const AddUser = () => {
  const [isLoading, setIsLoading] = useState(false);

  async function doAddUser(formValues) {
    if (isLoading) return;

    const cleanFormValues = doCleanFormValues(formValues);

    setIsLoading(true);

    const user = await UserService.createUser(cleanFormValues);

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
          showResendAuth={false}
        />
      </RaisedCard>
    </>
  ) : (
    <AccessDenied />
  );
};

export default AddUser;
