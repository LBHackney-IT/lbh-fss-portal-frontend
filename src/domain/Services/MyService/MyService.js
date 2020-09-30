import React, { useState, useContext } from "react";
import styled from "styled-components";
import UserContext from "../../../context/UserContext/UserContext";
import { ReactComponent as Trash } from "./icons/trash.svg";
import ServiceTable from "../ServiceTable/ServiceTable";
import ConfirmModal from "../../../components/ConfirmModal/ConfirmModal";
import { red } from "../../../settings";
import { breakpoint } from "../../../utils/breakpoint/breakpoint";
import Button from "../../../components/Button/Button";
import { Link } from "@reach/router";

const StyledActionDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  ${breakpoint("md")`
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
  `};
`;

const StyledButton = styled(Button)`
  margin: auto 0;
  padding: 10px 15px;
`;

const StyledAddServiceLink = styled.div`
  margin-top: 20px;
  ${breakpoint("sm")`
  margin-top: 0;
  `};
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const MyService = ({ userServices }) => {
  const user = useContext(UserContext)[0];
  const [selectedService, setSelectedService] = useState({});

  const [removeIsLoading, setRemoveIsLoading] = useState(false);
  const [removeModalIsOpen, setRemoveModalIsOpen] = useState(false);

  function toggleRemoveModal() {
    if (removeIsLoading) return;

    setRemoveModalIsOpen(!removeModalIsOpen);
  }

  async function doRemove() {
    alert("remove service");
  }

  let actions = [
    {
      title: "Remove",
      onClick: toggleRemoveModal,
      icon: Trash,
    },
  ];

  return (
    <>
      <StyledActionDiv>
        <StyledAddServiceLink>
          <StyledLink to="/services/add">
            <StyledButton label={"Add service"} />
          </StyledLink>
        </StyledAddServiceLink>
      </StyledActionDiv>
      {/* <StyledAddServiceLink>
        <Link to="/services/add">
          <StyledButton label={"Add service"} />
        </Link>
      </StyledAddServiceLink> */}
      <ServiceTable
        data={userServices}
        actions={actions}
        setSelectedService={setSelectedService}
        showPagination={false}
        actionWidth={"210px"}
        marginTop={"10px"}
      />
      <ConfirmModal
        isOpen={removeModalIsOpen}
        toggleModal={toggleRemoveModal}
        confirmMessage={
          <>
            Are you sure you want to remove{" "}
            <strong>{selectedService.name}</strong>?
          </>
        }
        confirmButtonLabel={"Remove"}
        confirmButtonColor={red[400]}
        borderColor={red[400]}
        onConfirm={doRemove}
        includeReviewerMessage={false}
      />
    </>
  );
};

export default MyService;
