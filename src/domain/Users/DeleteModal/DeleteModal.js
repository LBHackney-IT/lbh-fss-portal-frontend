import React from "react";
import Modal from "styled-react-modal";

const StyledModal = Modal.styled`
  width: 20rem;
  height: 20rem;
  display: flex;
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
      <div>
        <span>Are you sure you want to delete {user.name}?</span>
        <div>
          <button onClick={toggleModal}>Cancel</button>
          <button onClick={onConfirm}>Delete</button>
        </div>
      </div>
      <button onClick={toggleModal}>Close</button>
    </StyledModal>
  );
};

export default DeleteModal;
