import React, { useMemo, useState } from "react";
import { Link } from "@reach/router";
import styled from "styled-components";
import Table from "../../../components/Table/Table";
import FormDropDown from "../../../components/FormDropDown/FormDropDown";
import { green, red, yellow } from "../../../settings";
import { ReactComponent as ApproveCircle } from "./icons/approve-circle.svg";
import { ReactComponent as DeclineCircle } from "./icons/decline-circle.svg";
import { ReactComponent as Trash } from "./icons/trash.svg";
import { breakpoint } from "../../../utils/breakpoint/breakpoint";
import ConfirmModal from "../../../components/ConfirmModal/ConfirmModal";

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

const StyledFormDropDownContainer = styled.div`
  padding: 10px 20px 10px 0;
  display: inline;
  ${breakpoint("md")`
    display: block;
  `};
`;

function formatStatus(status) {
  switch (status) {
    case "active":
      return {
        title: "Published",
        backgroundColor: green[400],
        color: "white",
      };
      break;
    case "needs_reverification":
      return {
        title: "Awaiting reverification",
        backgroundColor: yellow[400],
        color: "black",
      };
      break;
    case "needs_review":
      return {
        title: "Awaiting review",
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
    case "deleted":
      return {
        title: "Deleted",
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

const OrganisationTable = ({ data, isLoading, search }) => {
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

  function doApprove() {
    alert("approve organisation");
  }
  function doDecline() {
    alert("decline organisation");
  }

  function doRemove(reviewerMessage) {
    // if (removeIsLoading) return;
    // setRemoveIsLoading(true)
    // api call DELETE / organisations/{organisationId}
    // setRemoveIsLoading(false)
    alert(`Removing with this message ${reviewerMessage}`);
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
              {organisationIsNew(e.row.original.created_at) ? (
                <StyledNewOrganisation>new</StyledNewOrganisation>
              ) : null}
            </>
          );
        },
      },
      {
        Header: "User",
        accessor: "user.name",
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
        accessor: "submitted_at",
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
              <StyledFormDropDownContainer
                onClick={() => {
                  setSelectedOrganisation(e.row.original);
                }}
              >
                <FormDropDown actions={actions} />
              </StyledFormDropDownContainer>
            </>
          );
        },
      },
    ],
    []
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
        confirmMessage={
          <>
            Are you sure you want to approve{" "}
            <strong>{selectedOrganisation.name}</strong>?
          </>
        }
        confirmButtonLabel={"Approve"}
        confirmButtonColor={green[400]}
        borderColor={green[300]}
        onConfirm={doApprove}
      />
      <ConfirmModal
        isOpen={declineModalIsOpen}
        toggleModal={toggleDeclineModal}
        confirmButtonLabel={"Decline"}
        confirmButtonColor={red[400]}
        borderColor={red[400]}
        onConfirm={doDecline}
        includeReviewerMessage={true}
        confirmTitle={"Decline organisation"}
      />
      <ConfirmModal
        isOpen={removeModalIsOpen}
        toggleModal={toggleRemoveModal}
        confirmButtonLabel={"Remove"}
        confirmButtonColor={red[400]}
        borderColor={red[400]}
        onConfirm={doRemove}
        includeReviewerMessage={true}
        confirmTitle={"Remove organisation"}
      />
    </>
  );
};

export default OrganisationTable;
