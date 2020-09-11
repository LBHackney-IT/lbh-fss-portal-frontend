import React from "react";
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
padding: 20px;
box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.05);
border-radius: 3px;
padding: 20px;
width: 20rem;
height: ${(props) => (props.heightMobile ? props.heightMobile : "15rem")};
${breakpoint("sm")`
width: 30rem;
height: ${(props) => (props.heightSmall ? props.heightSmall : "15rem")};
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

export default CustomModal;
