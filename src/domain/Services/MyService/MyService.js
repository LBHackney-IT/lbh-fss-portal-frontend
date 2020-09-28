import React, { useState, useContext } from "react";
import UserContext from "../../../context/UserContext/UserContext";
import { ReactComponent as Trash } from "./icons/trash.svg";
import ServiceTable from "../ServiceTable/ServiceTable";
import ConfirmModal from "../../../components/ConfirmModal/ConfirmModal";
import { red } from "../../../settings";

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
      <ServiceTable
        data={userServices}
        actions={actions}
        setSelectedService={setSelectedService}
        showPagination={false}
        actionWidth={"210px"}
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
