import React, { useState, useContext } from "react";
import UserForm from "../UserForm/UserForm";
import UserService from "../../../services/UserService/UserService";
import { toast } from "react-toastify";
import { navigate } from "@reach/router";
import UserContext from "../../../context/UserContext/UserContext";
import DeleteModal from "../DeleteModal/DeleteModal";
import useUserFetch from "../../../hooks/useUserFetch/useUserFetch";
import AccessDenied from "../../Error/AccessDenied/AccessDenied";

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

    setDeleteModalIsOpen(e);
  };

  if (fetchIsLoading) {
    return "<div data-testid='loading'>Loading</div>";
  }

  const accessPermission = roles.includes("viewer") || roles.includes("admin");

  return accessPermission ? (
    <>
      <h1>Edit user</h1>
      <UserForm
        onSubmit={onSubmit}
        defaultValues={{
          name: user.name || "",
          email: user.email || "",
          roles: user.roles || "",
        }}
        submitLoading={editIsLoading}
        showDeleteButton={true}
        onDelete={onDelete}
      />
      <DeleteModal
        isOpen={deleteModalIsOpen}
        toggleModal={toggleDeleteModal}
        onConfirm={doDelete}
        user={user}
      />
    </>
  ) : (
    <AccessDenied />
  );
};

export default EditUser;
