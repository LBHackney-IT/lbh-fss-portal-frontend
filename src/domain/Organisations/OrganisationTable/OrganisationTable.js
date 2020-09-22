import React, { useMemo, useState } from "react";
import { Link } from "@reach/router";
import styled from "styled-components";
import Table from "../../../components/Table/Table";
import TableActionDropDown from "../../../components/TableActionDropDown/TableActionDropDown";
import { green, red, yellow } from "../../../settings";
import { ReactComponent as ApproveCircle } from "./icons/approve-circle.svg";
import { ReactComponent as DeclineCircle } from "./icons/decline-circle.svg";
import { ReactComponent as Trash } from "./icons/trash.svg";
import { breakpoint } from "../../../utils/breakpoint/breakpoint";
import ConfirmModal from "../../../components/ConfirmModal/ConfirmModal";
import OrganisationService from "../../../services/OrganisationService/OrganisationService";
import { toast } from "react-toastify";

const StyledStatus = styled.div`
  background-color: ${(props) => props.status.backgroundColor};
  color: ${(props) => props.status.color};
  border-radius: 4px;
  padding: 5px;
  text-align: center;
  display: inline;
  ${breakpoint("md")`
    display: block;
    width: 75%;
  `};
`;

const StyledNewOrganisation = styled.span`
  color: red;
`;

const StyledTableActionDropDownContainer = styled.div`
  padding: 10px 20px 10px 0;
  display: inline;
  ${breakpoint("md")`
    display: block;
  `};
`;

function formatStatus(status) {
  switch (status) {
    case "published":
      return {
        title: "Published",
        backgroundColor: green[400],
        color: "white",
      };
      break;
    case "awaiting reverification":
      return {
        title: "Awaiting reverification",
        backgroundColor: yellow[400],
        color: "black",
      };
      break;
    case "awaiting review":
      return {
        title: "Awaiting review",
        backgroundColor: yellow[400],
        color: "black",
      };
      break;
    case "draft":
      return {
        title: "Draft",
        backgroundColor: yellow[400],
        color: "black",
      };
      break;
    case "rejected":
      return {
        title: "Rejected",
        backgroundColor: red[400],
        color: "white",
      };
      break;
    default:
      return {
        title: "Unknown",
        backgroundColor: red[400],
        color: "white",
      };
  }
}

function organisationIsNew(createdAt) {
  const createdAtDate = new Date(createdAt);
  const today = new Date();
  const differenceInDays = (today - createdAtDate) / (1000 * 3600 * 24);
  return differenceInDays <= 235; // <- 235 for demo purposes
  // return differenceInDays <= 1; // <- correct value to use after having demo'ed
}

const OrganisationTable = ({ data, organisationUser, isLoading, search }) => {
  const [selectedOrganisation, setSelectedOrganisation] = useState({});

  const [approveIsLoading, setApproveIsLoading] = useState(false);
  const [approveModalIsOpen, setApproveModalIsOpen] = useState(false);

  const [declineIsLoading, setDeclineIsLoading] = useState(false);
  const [declineModalIsOpen, setDeclineModalIsOpen] = useState(false);

  const [removeIsLoading, setRemoveIsLoading] = useState(false);
  const [removeModalIsOpen, setRemoveModalIsOpen] = useState(false);

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
    selectedOrganisation.reviewedAt = new Date();
    selectedOrganisation.reviewerMessage = reviewerMessage;

    const organisation = await OrganisationService.updateOrganisation(
      selectedOrganisation.id,
      selectedOrganisation
    );

    setApproveIsLoading(false);

    if (organisation) {
      toast.success(`${selectedOrganisation.name} was approved.`);
    } else {
      toast.error(`Unable to approve organisation.`);
    }

    setApproveModalIsOpen(false);
  }

  async function doDecline(reviewerMessage) {
    if (declineIsLoading) return;
    setDeclineIsLoading(true);

    selectedOrganisation.status = "rejected";
    selectedOrganisation.reviewedAt = new Date();
    selectedOrganisation.reviewerMessage = reviewerMessage;

    const organisation = await OrganisationService.updateOrganisation(
      selectedOrganisation.id,
      selectedOrganisation
    );

    setDeclineIsLoading(false);

    if (organisation) {
      toast.success(`${selectedOrganisation.name} was declined.`);
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

  const columns = useMemo(
    () => [
      {
        Header: "Organisation",
        accessor: "name",
        Cell: (e) => {
          return (
            <>
              <Link to={`/organisations/${e.row.original.id}/edit`}>
                {e.value}
              </Link>{" "}
              {organisationIsNew(e.row.original.createdAt) ? (
                <StyledNewOrganisation>new</StyledNewOrganisation>
              ) : null}
            </>
          );
        },
      },
      {
        Header: "User",
        accessor: "id",
        Cell: (e) => {
          return <> {organisationUser[e.value] || "User not found"} </>;
        },
      },
      {
        Header: "Status",
        accessor: "status",
        Cell: (e) => {
          const status = formatStatus(e.value);
          return <StyledStatus status={status}>{status.title}</StyledStatus>;
        },
      },
      {
        Header: "Submitted",
        accessor: "submittedAt",
        Cell: (e) => {
          const submittedAtDate = new Date(e.value);
          return submittedAtDate.toLocaleString();
        },
      },
      {
        Header: "Action",
        Cell: (e) => {
          return (
            <>
              <StyledTableActionDropDownContainer
                onClick={() => setSelectedOrganisation(e.row.original)}
              >
                <TableActionDropDown actions={actions} />
              </StyledTableActionDropDownContainer>
            </>
          );
        },
      },
    ],
    [organisationUser]
  );

  return (
    <>
      <Table
        data={data}
        columns={columns}
        isLoading={isLoading}
        search={search}
        tdHeightMobile={"20px"}
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
  );
};

export default OrganisationTable;
