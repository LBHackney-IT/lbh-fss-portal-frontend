import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import Button from "../Button/Button";
import Modal from "..//Modal/Modal";
import { grey } from "../../settings";
import { breakpoint } from "../../utils/breakpoint/breakpoint";

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
`;
const StyledTitleContainer = styled.div`
  width: 90%;
`;

const StyledTextarea = styled.textarea`
  resize: none;
  border: 3px solid black;
  padding: 10px;
  margin-bottom: 20px;
`;

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
  onConfirm,
  confirmButtonLabel,
  confirmButtonColor,
  confirmMessage,
  borderColor,
  includeTextInput,
  confirmTitle,
}) => {
  const { register, handleSubmit } = useForm();

  return (
    <Modal
      isOpen={isOpen}
      toggleModal={toggleModal}
      color={borderColor}
      heightSmall={includeTextInput ? "22rem" : "10rem"}
      heightMobile={includeTextInput ? "25rem" : "15rem"}
    >
      {includeTextInput ? (
        <>
          <StyledTitleContainer>
            <h1>{confirmTitle}</h1>
          </StyledTitleContainer>
          <StyledForm onSubmit={handleSubmit(({ input }) => onConfirm(input))}>
            <StyledTextarea
              name="input"
              placeholder="We can not add you right now for the following reasons..."
              rows={8}
              cols={32}
              ref={register}
            />
            <StyledActionContainer>
              <StyledButton
                onClick={toggleModal}
                label={"Cancel"}
                color={grey[400]}
              />
              <StyledButton
                type="submit"
                label={confirmButtonLabel}
                color={confirmButtonColor}
              />
            </StyledActionContainer>
          </StyledForm>
        </>
      ) : (
        <>
          <StyledText>{confirmMessage}</StyledText>
          <StyledActionContainer>
            <StyledButton
              onClick={toggleModal}
              label={"Cancel"}
              color={grey[400]}
            />
            <StyledButton
              onClick={onConfirm}
              label={confirmButtonLabel}
              color={confirmButtonColor}
            />
          </StyledActionContainer>
        </>
      )}
    </Modal>
  );
};

ConfirmModal.propTypes = {
  isOpen: PropTypes.bool,
  toggleModal: PropTypes.func,
  confirmMessage: PropTypes.string,
  confirmButtonLabel: PropTypes.string,
  confirmButtonColor: PropTypes.string,
  onConfirm: PropTypes.func,
  borderColor: PropTypes.string,
  includeTextInput: PropTypes.bool,
  confirmTitle: PropTypes.string,
};

export default ConfirmModal;
