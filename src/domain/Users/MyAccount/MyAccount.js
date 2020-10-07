import React, { useState, useContext } from "react";
import UserForm from "../UserForm/UserForm";
import useUserFetch from "../../../hooks/useUserFetch/useUserFetch";
import UserContext from "../../../context/UserContext/UserContext";
import UserService from "../../../services/UserService/UserService";
import RaisedCard from "../../../components/RaisedCard/RaisedCard";
import { toast } from "react-toastify";
import { navigate } from "@reach/router";
import styled from "styled-components";
import { yellow } from "../../../settings";
import { doCleanFormValues } from "../../../utils/functions/userFunctions";

const StyledSetPasswordMessage = styled.div`
  padding: 0px 30px;
  background: ${yellow[100]};
  border: 1px solid ${yellow[500]};
  font-weight: bold;
  margin-bottom: 40px;
`;

const MyAccount = (props) => {
  const localUser = useContext(UserContext)[0];

  const { user, isLoading: fetchIsLoading } = useUserFetch(localUser.id);

  const [editIsLoading, setEditIsLoading] = useState(false);

  const onSubmit = (formValues) => {
    async function doEditUser() {
      if (editIsLoading) return;

      setEditIsLoading(true);

      const cleanFormValues = doCleanFormValues({
        user: user,
        formValues: formValues,
        updateRoles: false,
        setCreatedAt: true,
      });

      const newUser = await UserService.updateUser(
        localUser.id,
        cleanFormValues
      );

      setEditIsLoading(false);

      if (newUser) {
        toast.success(`Your account has been updated.`);

        navigate("/organisation");
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
      {user.set_password_required ? (
        <StyledSetPasswordMessage>
          <p>Please set your password below</p>
        </StyledSetPasswordMessage>
      ) : null}
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
