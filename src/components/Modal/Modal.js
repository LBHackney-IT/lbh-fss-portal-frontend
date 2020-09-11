import React from "react";
import PropTypes from "prop-types";
import Modal from "styled-react-modal";
import { breakpoint } from "../../utils/breakpoint/breakpoint";
import { red } from "../../settings";

const StyledModal = Modal.styled`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  border-top: 4px solid ${(props) =>
    props.color ? props.color : red[400]} !important;
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.05);
  border-radius: 3px;
  padding: 20px;
  width: 20rem;
  height: ${(props) => (props.heightMobile ? props.heightMobile : "15rem")};
  ${breakpoint("sm")`
  width: 30rem;
  height: ${(props) => (props.heightSmall ? props.heightSmall : "10rem")};
  `};
`;

const CustomModal = ({
  children,
  isOpen,
  toggleModal,
  color,
  heightMobile,
  heightSmall,
}) => {
  return (
    <StyledModal
      isOpen={isOpen}
      onBackgroundClick={toggleModal}
      onEscapeKeydown={toggleModal}
      color={color}
      heightMobile={heightMobile}
      heightSmall={heightSmall}
    >
      {children}
    </StyledModal>
  );
};

CustomModal.propTypes = {
  children: PropTypes.object,
  isOpen: PropTypes.bool,
  toggleModal: PropTypes.func,
  color: PropTypes.string,
  heightMobile: PropTypes.string,
  heightSmall: PropTypes.string,
};

export default CustomModal;
