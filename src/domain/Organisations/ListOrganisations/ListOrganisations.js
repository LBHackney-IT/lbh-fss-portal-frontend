import React, { useEffect, useState, useContext, useMemo } from "react";
import OrganisationTable from "../OrganisationTable/OrganisationTable";
import Search from "../../../components/Search/Search";
import UserContext from "../../../context/UserContext/UserContext";
import AccessDenied from "../../Error/AccessDenied/AccessDenied";
import OrganisationService from "../../../services/OrganisationService/OrganisationService";
import { grey, green, red } from "../../../settings";
import styled from "styled-components";
import { breakpoint } from "../../../utils/breakpoint/breakpoint";
import UserService from "../../../services/UserService/UserService";
import { ReactComponent as ApproveCircle } from "./icons/approve-circle.svg";
import { ReactComponent as DeclineCircle } from "./icons/decline-circle.svg";
import { ReactComponent as Trash } from "./icons/trash.svg";
import { toast } from "react-toastify";
import ConfirmModal from "../../../components/ConfirmModal/ConfirmModal";
import { checkIsInternalTeam } from "../../../utils/functions/functions";

const StyledActionDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 20px;
  ${breakpoint("sm")`
    flex-direction: row;
    height: 80px;
    padding: 0 10px;
    justify-content: space-between;
    align-items: center;
  `};

  background-color: ${grey[500]};
`;

async function fetchData(search, setData, setIsLoading) {
  let organisations = false;

  setIsLoading(true);

  if (search) {
    organisations = await OrganisationService.retrieveOrganisations({
      limit: 9999,
      search: search,
    });
  } else {
    organisations = await OrganisationService.retrieveOrganisations({
      limit: 9999,
      search: "",
    });
  }

  setIsLoading(false);

  setData(organisations || []);
}

const ListOrganisations = ({ location }) => {
  const { roles } = useContext(UserContext)[0];

  const [selectedOrganisation, setSelectedOrganisation] = useState({});

  const [search, setSearch] = useState(false);

  const [approveIsLoading, setApproveIsLoading] = useState(false);
  const [approveModalIsOpen, setApproveModalIsOpen] = useState(false);

  const [declineIsLoading, setDeclineIsLoading] = useState(false);
  const [declineModalIsOpen, setDeclineModalIsOpen] = useState(false);

  const [removeIsLoading, setRemoveIsLoading] = useState(false);
  const [removeModalIsOpen, setRemoveModalIsOpen] = useState(false);

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [organisationUser, setOrganisationUser] = useState({});
  const [organisationUserIsLoading, setOrganisationUserIsLoading] = useState(
    true
  );

  useEffect(() => {
    async function fetchOrganisationUser() {
      const users = await UserService.retrieveUsers("name", "asc", 0, 9999, "");

      setOrganisationUserIsLoading(false);

      let organisationUserObject = {};

      if (users) {
        Object.keys(users).forEach((key) => {
          if (users[key].organisation) {
            const organisationId = users[key].organisation.id;
            const userName = users[key].name;
            organisationUserObject[organisationId] = userName;
          }
        });

        setOrganisationUser(organisationUserObject);
      }
    }

    fetchOrganisationUser();
  }, [setOrganisationUser, setOrganisationUserIsLoading]);

  useEffect(() => {
    fetchData(search, setData, setIsLoading);
  }, [search, setData, setIsLoading]);

  function toggleApproveModal() {
    if (approveIsLoading) return;

    setApproveModalIsOpen(!approveModalIsOpen);
  }

  function toggleDeclineModal() {
    if (declineIsLoading) return;

    setDeclineModalIsOpen(!declineModalIsOpen);
  }

  function toggleRemoveModal() {
    if (removeIsLoading) return;

    setRemoveModalIsOpen(!removeModalIsOpen);
  }

  async function doApprove(reviewerMessage) {
    if (approveIsLoading) return;

    setApproveIsLoading(true);

    selectedOrganisation.status = "published";
    selectedOrganisation.reviewed_at = new Date();
    selectedOrganisation.reviewer_message = reviewerMessage;

    const organisation = await OrganisationService.updateOrganisation(
      selectedOrganisation.id,
      selectedOrganisation
    );

    setApproveIsLoading(false);

    if (organisation) {
      toast.success(`${selectedOrganisation.name} was approved.`);
      fetchData(search, setData, setIsLoading);
    } else {
      toast.error(`Unable to approve organisation.`);
    }

    setApproveModalIsOpen(false);
  }

  async function doDecline(reviewerMessage) {
    if (declineIsLoading) return;
    setDeclineIsLoading(true);

    selectedOrganisation.status = "rejected";
    selectedOrganisation.reviewed_at = new Date();
    selectedOrganisation.reviewer_message = reviewerMessage;

    const organisation = await OrganisationService.updateOrganisation(
      selectedOrganisation.id,
      selectedOrganisation
    );

    setDeclineIsLoading(false);

    if (organisation) {
      toast.success(`${selectedOrganisation.name} was declined.`);
      fetchData(search, setData, setIsLoading);
    } else {
      toast.error(`Unable to decline organisation.`);
    }

    setDeclineModalIsOpen(false);
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
      fetchData(search, setData, setIsLoading);
    } else {
      toast.error(`Unable to remove organisation.`);
    }

    setRemoveModalIsOpen(false);
  }

  const actions = [
    {
      title: "Approve",
      onClick: toggleApproveModal,
      icon: ApproveCircle,
    },
    {
      title: "Decline",
      onClick: toggleDeclineModal,
      icon: DeclineCircle,
    },
    {
      title: "Remove",
      onClick: toggleRemoveModal,
      icon: Trash,
    },
  ];

  const isInternalTeam = checkIsInternalTeam(roles);

  if (isLoading || organisationUserIsLoading) {
    return <span>Loading...</span>;
  }

  return isInternalTeam ? (
    <>
      <div>
        <StyledActionDiv>
          <Search setSearch={setSearch} />
        </StyledActionDiv>
      </div>
      <OrganisationTable
        data={data}
        organisationUser={organisationUser}
        isLoading={isLoading}
        search={search}
        setSelectedOrganisation={setSelectedOrganisation}
        actions={actions}
      />
      <ConfirmModal
        isOpen={approveModalIsOpen}
        toggleModal={toggleApproveModal}
        confirmButtonLabel={"Approve"}
        confirmButtonColor={green[400]}
        borderColor={green[300]}
        onConfirm={doApprove}
        includeReviewerMessage={true}
        reviewerMessagePlaceholder={
          "Thank you for listing your organisation..."
        }
        confirmTitle={"Approve organisation"}
      />
      <ConfirmModal
        isOpen={declineModalIsOpen}
        toggleModal={toggleDeclineModal}
        confirmButtonLabel={"Decline"}
        confirmButtonColor={red[400]}
        borderColor={red[400]}
        onConfirm={doDecline}
        includeReviewerMessage={true}
        reviewerMessagePlaceholder={
          "We can not add you right now for the following reasons..."
        }
        confirmTitle={"Decline organisation"}
      />
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
  ) : (
    <AccessDenied />
  );
};

export default ListOrganisations;
