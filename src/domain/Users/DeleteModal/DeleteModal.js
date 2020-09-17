import React from "react";
import styled from "styled-components";
import Button from "../../../components/Button/Button";
import Modal from "../../../components/Modal/Modal";
import { red, grey } from "../../../settings";
import { breakpoint } from "../../../utils/breakpoint/breakpoint";

const StyledText = styled.p`
  margin-bottom: 20px;
`;

const StyledActionContainer = styled.div`
  display: flex;
  flex-direction: column;
  ${breakpoint("sm")`
  flex-direction: row;
`};
`;

const StyledButton = styled(Button)`
  margin: 10px 0;
  ${breakpoint("sm")`
    margin: 0 10px;
`};
`;

const DeleteModal = ({ isOpen, toggleModal, user, onConfirm }) => {
  return (
    <Modal
      isOpen={isOpen}
      onBackgroundClick={toggleModal}
      onEscapeKeydown={toggleModal}
    >
      <StyledText>
        Are you sure you want to delete <strong> {user.name}</strong>?
      </StyledText>
      <StyledActionContainer>
        <StyledButton
          onClick={toggleModal}
          label={"Cancel"}
          color={grey[400]}
        />
        <StyledButton onClick={onConfirm} label={"Delete"} color={red[400]} />
      </StyledActionContainer>
    </Modal>
  );
};

export default DeleteModal;
