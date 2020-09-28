import React, { useContext, useEffect, useState } from "react";
import UserContext from "../../../context/UserContext/UserContext";
import styled from "styled-components";
import EmptyOrganisation from "../EmptyOrganisation/EmptyOrganisation";
import { navigate } from "@reach/router";
import OrganisationTable from "../OrganisationTable/OrganisationTable";
import useOrganisationFetch from "../../../hooks/useOrganisationFetch/useOrganisationFetch";
import { ReactComponent as RightArrow } from "./icons/right-arrow.svg";
import { ReactComponent as Trash } from "./icons/trash.svg";
import OrganisationService from "../../../services/OrganisationService/OrganisationService";
import { toast } from "react-toastify";
import ConfirmModal from "../../../components/ConfirmModal/ConfirmModal";
import { red, green } from "../../../settings";

const StyledFeedback = styled.div`
  box-sizing: border-box;
  border-radius: 3px;
  padding: 15px;
  width: 60%;
  margin: 10px 0 30px 0;
`;

const StyledRejectedFeedback = styled(StyledFeedback)`
  background: rgba(190, 58, 52, 0.1);
  border: 1px solid #be3a34;
`;

const StyledApprovedFeedback = styled(StyledFeedback)`
  background: rgba(0, 40, 31, 0.1);
  border: 1px solid ${green[400]};
`;

const MyOrganisation = () => {
  const user = useContext(UserContext)[0];
  const [selectedOrganisation, setSelectedOrganisation] = useState({});

  const [removeIsLoading, setRemoveIsLoading] = useState(false);
  const [removeModalIsOpen, setRemoveModalIsOpen] = useState(false);

  const {
    organisation,
    isLoading: organisationFetchIsLoading,
  } = useOrganisationFetch(user.organisation.id);

  const [organisationUser, setOrganisationUser] = useState({});

  useEffect(() => {
    let localOrganisationUser = {};
    const organisationId = user.organisation.id;
    const userName = user.name;
    localOrganisationUser[organisationId] = userName;

    setOrganisationUser(localOrganisationUser);
  }, [user, setOrganisationUser]);

  function toggleRemoveModal() {
    if (removeIsLoading) return;

    setRemoveModalIsOpen(!removeModalIsOpen);
  }

  function doViewOrganisation() {
    navigate(`/organisations/${user.organisation.id}/edit`);
  }

  function doUpdateOrganisation() {
    navigate(`/organisations/${user.organisation.id}/edit`);
  }

  async function doRemove() {
    if (removeIsLoading) return;

    setRemoveIsLoading(true);

    const organisationDeleted = await OrganisationService.deleteOrganisation(
      selectedOrganisation.id
    );

    setRemoveIsLoading(false);

    if (organisationDeleted) {
      toast.success(`${selectedOrganisation.name} removed.`);
    } else {
      toast.error(`Unable to remove organisation.`);
    }

    setRemoveModalIsOpen(false);
  }

  let actions = [];

  if (!organisationFetchIsLoading) {
    actions = [
      {
        title:
          organisation.status === "rejected"
            ? "Update organisation"
            : "View organisation",
        onClick: doViewOrganisation,
        icon: RightArrow,
      },
      {
        title: "Remove",
        onClick: toggleRemoveModal,
        icon: Trash,
      },
    ];
  }

  if (user.organisation) {
    return organisationFetchIsLoading ? (
      <div>Loading...</div>
    ) : (
      <>
        <OrganisationTable
          data={[organisation]}
          organisationUser={organisationUser}
          showPagination={false}
          setSelectedOrganisation={setSelectedOrganisation}
          actions={actions}
          actionWidth={"210px"}
        />
        {organisation.status === "rejected" && organisation.reviewerMessage ? (
          <StyledRejectedFeedback>
            {organisation.reviewerMessage}
          </StyledRejectedFeedback>
        ) : null}
        {organisation.status === "published" && organisation.reviewerMessage ? (
          <StyledApprovedFeedback>
            {organisation.reviewerMessage}
          </StyledApprovedFeedback>
        ) : null}
        <ConfirmModal
          isOpen={removeModalIsOpen}
          toggleModal={toggleRemoveModal}
          confirmMessage={
            <>
              Are you sure you want to remove{" "}
              <strong>{selectedOrganisation.name}</strong>?
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
  } else {
    return <EmptyOrganisation />;
  }
};

export default MyOrganisation;
