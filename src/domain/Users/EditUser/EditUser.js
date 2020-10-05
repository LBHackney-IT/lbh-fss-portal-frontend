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

const EditUser = (props) => {
  const { user, isLoading: fetchIsLoading } = useUserFetch(props.userId);
  const [editIsLoading, setEditIsLoading] = useState(false);
  const [deleteIsLoading, setDeleteIsLoading] = useState(false);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const { roles } = useContext(UserContext)[0];

  function toggleDeleteModal() {
    if (deleteIsLoading) return;

    setDeleteModalIsOpen(!deleteModalIsOpen);
  }

  const onSubmit = (formValues) => {
    async function doEditUser() {
      if (editIsLoading) return;

      Object.keys(user).forEach(function (key) {
        if (formValues[key]) {
          user[key] = formValues[key];
        }
      });

      user.password = formValues.password || null;
      delete user.id;

      setEditIsLoading(true);

      const newUser = await UserService.updateUser(props.userId, user);

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

  if (fetchIsLoading) {
    return "<div data-testid='loading'>Loading</div>";
  }

  const isInternalTeam = checkIsInternalTeam(roles);

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
