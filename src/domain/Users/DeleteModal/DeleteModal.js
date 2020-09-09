import React from "react";
import Modal from "styled-react-modal";
import Button from "../../../components/Button/Button";

const StyledModal = Modal.styled`
  width: 20rem;
  height: 20rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
`;

const DeleteModal = ({ isOpen, toggleModal, user, onConfirm }) => {
  return (
    <StyledModal
      isOpen={isOpen}
      onBackgroundClick={toggleModal}
      onEscapeKeydown={toggleModal}
    >
      <p>Are you sure you want to delete {user.name}?</p>
      <Button onClick={toggleModal} label={"Cancel"} />
      <Button onClick={onConfirm} label={"Delete"} />
    </StyledModal>
  );
};

export default DeleteModal;
