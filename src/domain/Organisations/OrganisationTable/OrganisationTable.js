import React, { useContext, useLayoutEffect, useMemo } from "react";
import { Link } from "@reach/router";
import styled from "styled-components";
import Table from "../../../components/Table/Table";
import TableActionDropDown from "../../../components/TableActionDropDown/TableActionDropDown";
import { green, red, yellow } from "../../../settings";
import { breakpoint } from "../../../utils/breakpoint/breakpoint";
import UserContext from "../../../context/UserContext/UserContext";
import { checkIsInternalTeam } from "../../../utils/functions/functions";

const StyledUsers = styled.div`
  margin: 10px 0;
`;

const StyledStatus = styled.div`
  background-color: ${(props) => props.status.backgroundColor};
  color: ${(props) => props.status.color};
  border-radius: 4px;
  padding: 5px;
  text-align: center;
  display: inline;
  ${breakpoint("md")`
    display: block;
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
    case "paused":
      return {
        title: "Paused",
        backgroundColor: yellow[400],
        color: "black",
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
  return differenceInDays <= 1;
}

const OrganisationTable = ({
  data,
  organisationUser,
  isLoading,
  search,
  actions,
  setSelectedOrganisation,
  showPagination,
  actionWidth,
}) => {
  const user = useContext(UserContext)[0];

  const isInternalTeam = checkIsInternalTeam(user.roles);

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
        Header: "Users",
        accessor: "id",
        Cell: (e) => {
          let userArray = [];
          if (isInternalTeam) {
            userArray = organisationUser[e.value];
          } else {
            userArray = organisationUser;
          }

          if (userArray) {
            return (
              <>
                {userArray.map((user, index) => {
                  return (
                    <StyledUsers key={index}>
                      {
                        (isInternalTeam)
                          ?
                        <Link to={`/users/${user.id}/edit`}>{user.name}</Link>
                          :
                        <span>{user.name}</span>
                      }
                    </StyledUsers>
                  );
                })}
              </>
            );
          } else {
            return <StyledUsers>No users</StyledUsers>;
          }
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
              <StyledTableActionDropDownContainer
                onClick={() => setSelectedOrganisation(e.row.original)}
              >
                <TableActionDropDown
                  actions={actions}
                  actionWidth={actionWidth}
                />
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
        showPagination={showPagination}
      />
    </>
  );
};

export default OrganisationTable;
