import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import Button from "../Button/Button";
import Modal from "..//Modal/Modal";
import { grey } from "../../settings";
import { breakpoint } from "../../utils/breakpoint/breakpoint";

const StyledForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
const StyledTitleContainer = styled.div``;

const StyledTextarea = styled.textarea`
  resize: none;
  border: 3px solid black;
  padding: 10px;
  margin-bottom: 20px;
`;

const StyledText = styled.p`
  margin-bottom: 20px;
`;

const StyledH1 = styled.h1`
  margin: 10px 0 20px 0;
  ${breakpoint("sm")`
   margin: -20px 0 20px 0;
`};
`;

const StyledActionContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
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
  includeReviewerMessage,
  reviewerMessagePlaceholder,
  confirmTitle,
}) => {
  const { register, handleSubmit } = useForm();

  return (
    <Modal
      isOpen={isOpen}
      toggleModal={toggleModal}
      color={borderColor}
      heightSmall={includeReviewerMessage ? "22rem" : "10rem"}
      heightMobile={includeReviewerMessage ? "25rem" : "15rem"}
    >
      {includeReviewerMessage ? (
        <>
          <StyledTitleContainer>
            <StyledH1>{confirmTitle}</StyledH1>
          </StyledTitleContainer>
          <StyledForm
            onSubmit={handleSubmit(({ reviewer_message }) =>
              onConfirm(reviewer_message)
            )}
          >
            <StyledTextarea
              name="reviewer_message"
              placeholder={reviewerMessagePlaceholder}
              rows={8}
              cols={32}
              ref={register}
            />
            <StyledActionContainer>
              <StyledButton
                onClick={toggleModal}
                label={"Cancel"}
                backgroundColor={grey[400]}
              />
              <StyledButton
                type="submit"
                label={confirmButtonLabel}
                backgroundColor={confirmButtonColor}
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
              backgroundColor={grey[400]}
            />
            <StyledButton
              onClick={onConfirm}
              label={confirmButtonLabel}
              backgroundColor={confirmButtonColor}
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
  confirmMessage: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  confirmButtonLabel: PropTypes.string,
  confirmButtonColor: PropTypes.string,
  onConfirm: PropTypes.func,
  borderColor: PropTypes.string,
  includeReviewerMessage: PropTypes.bool,
  confirmTitle: PropTypes.string,
};

export default ConfirmModal;
