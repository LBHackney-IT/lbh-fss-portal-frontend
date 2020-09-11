import React from "react";
import styled from "styled-components";
import Button from "../Button/Button";
import Modal from "..//Modal/Modal";
import { red, grey } from "../../settings";
import { breakpoint } from "../../utils/breakpoint/breakpoint";

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

const ConfirmModal = ({
  isOpen,
  toggleModal,
  confirmMessage,
  confirmLabel,
  confirmButtonColor,
  onConfirm,
  borderColor,
}) => {
  return (
    <Modal isOpen={isOpen} toggleModal={toggleModal} color={borderColor}>
      <StyledText>{confirmMessage}</StyledText>
      {/* INPUT FIELD HERE */}
      <StyledActionContainer>
        <StyledButton
          onClick={toggleModal}
          label={"Cancel"}
          color={grey[400]}
        />
        <StyledButton
          onClick={onConfirm}
          label={confirmLabel}
          color={confirmButtonColor}
        />
      </StyledActionContainer>
    </Modal>
  );
};

export default ConfirmModal;
