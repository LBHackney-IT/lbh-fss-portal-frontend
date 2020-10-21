import React, { useState, useContext } from "react";
import UserForm from "../UserForm/UserForm";
import UserService from "../../../services/UserService/UserService";
import { toast } from "react-toastify";
import { navigate } from "@reach/router";
import UserContext from "../../../context/UserContext/UserContext";
import useUserFetch from "../../../hooks/useUserFetch/useUserFetch";
import AccessDenied from "../../Error/AccessDenied/AccessDenied";
import RaisedCard from "../../../components/RaisedCard/RaisedCard";
import ConfirmModal from "../../../components/ConfirmModal/ConfirmModal";
import { red } from "../../../settings";
import { checkIsInternalTeam } from "../../../utils/functions/functions";
import { doCleanFormValues } from "../../../utils/functions/userFunctions";

const EditUser = (props) => {
  const { user, isLoading: fetchIsLoading } = useUserFetch(props.userId);
  const [editIsLoading, setEditIsLoading] = useState(false);
  const [deleteIsLoading, setDeleteIsLoading] = useState(false);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [resendAuthIsLoading, setResendAuthIsLoading] = useState(false);

  const { roles } = useContext(UserContext)[0];

  function toggleDeleteModal() {
    if (deleteIsLoading) return;

    setDeleteModalIsOpen(!deleteModalIsOpen);
  }

  const onSubmit = (formValues) => {
    async function doEditUser() {
      if (editIsLoading) return;

      const cleanFormValues = doCleanFormValues({
        user: user,
        formValues: formValues,
        updateRoles: true,
        setCreatedAt: false,
      });

      setEditIsLoading(true);

      const newUser = await UserService.updateUser(
        props.userId,
        cleanFormValues
      );

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

  async function doDelete() {
    if (deleteIsLoading) return;

    setDeleteIsLoading(true);

    const deleteSuccess = await UserService.deleteUser(props.userId);

    setDeleteIsLoading(false);

    setDeleteModalIsOpen(false);

    if (deleteSuccess) {
      toast.success(`User ${user.name} deleted.`);

      navigate("/users");
    } else {
      toast.error("Unable to delete user.");
    }
  }

  const onDelete = (e) => {
    e.preventDefault();

    setDeleteModalIsOpen(true);
  };

  async function doResendAuthentication() {
    if (resendAuthIsLoading) return;

    setResendAuthIsLoading(true);

    const resendSuccess = await UserService.resendAuthentication(props.userId);

    setResendAuthIsLoading(false);

    if (resendSuccess) {
      toast.success(`Authentication details sent to ${user.name}.`);

      navigate("/users");
    } else {
      toast.error("Unable to resend authentication details.");
    }
  }

  if (fetchIsLoading || resendAuthIsLoading) {
    return <div data-testid="loading">Loading...</div>;
  }

  const isInternalTeam = checkIsInternalTeam(roles);

  user.roles = user.roles.map((role) => {
    return role.toLowerCase();
  });

  return isInternalTeam ? (
    <>
      <h1>Edit user</h1>
      <RaisedCard>
        <UserForm
          onSubmit={onSubmit}
          defaultValues={{
            name: user.name || "",
            email: user.email || "",
            roles: user.roles || "",
          }}
          submitLoading={editIsLoading}
          showDeleteButton={true}
          showEmail={false}
          onDelete={onDelete}
          showResendAuth={user.status === "unverified"}
          onResendAuth={doResendAuthentication}
        />
      </RaisedCard>
      <ConfirmModal
        isOpen={deleteModalIsOpen}
        toggleModal={toggleDeleteModal}
        confirmMessage={
          <>
            Are you sure you want to delete <strong> {user.name}</strong>?
          </>
        }
        confirmButtonLabel={"Delete"}
        confirmButtonColor={red[400]}
        borderColor={red[400]}
        onConfirm={doDelete}
      />
      <ConfirmModal />
    </>
  ) : (
    <AccessDenied />
  );
};

export default EditUser;
