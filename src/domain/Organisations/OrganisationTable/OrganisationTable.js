import React, { useMemo } from "react";
import { Link } from "@reach/router";
import styled from "styled-components";
import Table from "../../../components/Table/Table";
import FormDropDown from "../../../components/FormDropDown/FormDropDown";
import { green, red, yellow } from "../../../settings";
import { ReactComponent as ApproveCircle } from "./icons/approve-circle.svg";
import { ReactComponent as DeclineCircle } from "./icons/decline-circle.svg";
import { ReactComponent as Trash } from "./icons/trash.svg";
import { breakpoint } from "../../../utils/breakpoint/breakpoint";

const StyledStatus = styled.div`
  background-color: ${(props) => props.status.backgroundColor};
  color: ${(props) => props.status.color};
  border-radius: 4px;
  padding: 5px;
  text-align: center;
  display: inline;
  ${breakpoint("md")`
    display: block;
    width: 70%;
  `};
`;

const StyledNewOrganisation = styled.span`
  color: red;
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
  // return differenceInDays <= 1;
}

function doApprove() {
  alert("approve organisation");
}
function doDecline() {
  alert("decline organisation");
}
function doRemove() {
  alert("remove organisation");
}

const actions = [
  {
    title: "Approve",
    onClick: doApprove,
    icon: ApproveCircle,
  },
  {
    title: "Decline",
    onClick: doDecline,
    icon: DeclineCircle,
  },
  {
    title: "Remove",
    onClick: doRemove,
    icon: Trash,
  },
];

const OrganisationTable = ({ data, isLoading, search }) => {
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
        Header: "Status",
        accessor: "status",
        Cell: (e) => {
          const status = formatStatus(e.row.original.status);
          return <StyledStatus status={status}>{status.title}</StyledStatus>;
        },
      },
      {
        Header: "Submitted",
        accessor: "submitted_at",
        Cell: (e) => {
          const submittedAtDate = new Date(e.row.original.submitted_at);
          return submittedAtDate.toLocaleString();
        },
      },
      {
        Header: "Action",
        Cell: (e) => {
          return (
            <>
              <div style={{ padding: "10px 20px 10px 0", display: "inline" }}>
                <FormDropDown actions={actions} />
              </div>
            </>
          );
        },
      },
    ],
    []
  );

  return (
    <Table
      data={data}
      columns={columns}
      isLoading={isLoading}
      search={search}
      tdHeightMobile={"20px"}
    />
  );
};

export default OrganisationTable;
