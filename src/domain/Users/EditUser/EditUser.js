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
import {
  checkIsInternalTeam,
  arraysEqual,
} from "../../../utils/functions/functions";
import { doCleanFormValues } from "../../../utils/functions/userFunctions";
import AppLoading from "../../../AppLoading";

const EditUser = (props) => {
  const {
    user,
    setUser,
    isLoading: fetchIsLoading,
    setIsLoading: setFetchIsLoading,
  } = useUserFetch(props.userId);
  const [editIsLoading, setEditIsLoading] = useState(false);
  const [deleteIsLoading, setDeleteIsLoading] = useState(false);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [
    removeOrganisationIsLoading,
    setRemoveOrganisationIsLoading,
  ] = useState(false);
  const [
    removeOrganisationModalIsOpen,
    setRemoveOrganisationModalIsOpen,
  ] = useState(false);
  const [resendAuthIsLoading, setResendAuthIsLoading] = useState(false);

  const { roles } = useContext(UserContext)[0];

  function toggleDeleteModal() {
    if (deleteIsLoading) return;

    setDeleteModalIsOpen(!deleteModalIsOpen);
  }

  function toggleRemoveOrganisationModal() {
    if (removeOrganisationIsLoading) return;

    setRemoveOrganisationModalIsOpen(!removeOrganisationModalIsOpen);
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
        const previousRoles = user.roles
          .map((role) => {
            return role.toLowerCase();
          })
          .sort();

        const newRoles = newUser.roles
          .map((role) => {
            return role.toLowerCase();
          })
          .sort();

        if (
          user.name == newUser.name &&
          arraysEqual(previousRoles, newRoles) &&
          cleanFormValues.password
        ) {
          toast.success(`User ${newUser.name} password updated.`);
        } else {
          toast.success(`User ${newUser.name} updated.`);
        }

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

  async function doRemoveOrganisation(e) {
    e.preventDefault();
    // make call to DELETE /user-links/{userId} endpoint
    // fetchUser(setUser, setFetchIsLoading);

    console.log("do unlink here");

    setFetchIsLoading(true);

    const updatedUser = await UserService.getUser(user.id);

    setFetchIsLoading(false);

    if (updatedUser) {
      setUser(updatedUser);
    } else {
      toast.error("Unable to retrieve updated user.");
    }
    setRemoveOrganisationModalIsOpen(false);
  }

  const onRemoveOrganisation = (e) => {
    e.preventDefault();

    setRemoveOrganisationModalIsOpen(true);
  };

  if (fetchIsLoading || resendAuthIsLoading) {
    return <AppLoading />;
  }

  const isInternalTeam = checkIsInternalTeam(roles);

  user.roles = user.roles.map((role) => {
    return role.toLowerCase();
  });

  let userHasOrganisation = false;

  if (user.organisation) {
    userHasOrganisation = true;
  }

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
            organisation: userHasOrganisation ? user.organisation.name : "",
          }}
          submitLoading={editIsLoading}
          showDeleteButton={true}
          showEmail={false}
          onDelete={onDelete}
          showPassword={user.status !== "invited"}
          showResendAuth={user.status === "invited"}
          onResendAuth={doResendAuthentication}
          onRemoveOrganisation={onRemoveOrganisation}
          showRemoveOrganisation={userHasOrganisation}
          showAddOrganisation={!userHasOrganisation}
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
      <ConfirmModal
        isOpen={removeOrganisationModalIsOpen}
        toggleModal={toggleRemoveOrganisationModal}
        confirmMessage={
          <>
            Are you sure you want to unlink{" "}
            <strong> {user.organisation.name}</strong>?
          </>
        }
        confirmButtonLabel={"Unlink"}
        confirmButtonColor={red[400]}
        borderColor={red[400]}
        onConfirm={doRemoveOrganisation}
      />
      <ConfirmModal />
    </>
  ) : (
    <AccessDenied />
  );
};

export default EditUser;
