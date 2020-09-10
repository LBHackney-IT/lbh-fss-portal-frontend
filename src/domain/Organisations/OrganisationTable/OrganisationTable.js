import React, { useMemo } from "react";
// import { useTable, usePagination } from "react-table";
import { Link } from "@reach/router";
import { roles } from "../../../settings";
import styled from "styled-components";
// import UserPagination from "../UserPagination/UserPagination";
import { breakpoint } from "../../../utils/breakpoint/breakpoint";
import Table from "../../../components/Table/Table";

const StyledEmailText = styled.p`
  margin-top: 10px;
`;

const StyledUl = styled.ul`
  padding-left: 20px;
`;

const OrganisationTable = ({ data, isLoading, search }) => {
  const columns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
        Cell: (e) => {
          return (
            <>
              <Link to={`/users/${e.row.original.id}/edit`}>{e.value}</Link>
              <StyledEmailText>{e.row.original.email}</StyledEmailText>
            </>
          );
        },
      },
      {
        Header: "Organisation",
        accessor: "organisation.name",
      },
      {
        Header: "Roles",
        accessor: "roles",
        Cell: (e) => {
          return (
            <StyledUl>
              {e.value.map((item, i) => {
                return <li key={i}>{roles[item]}</li>;
              })}
            </StyledUl>
          );
        },
      },
      {
        Header: "Member for",
        accessor: "member_for",
      },
      {
        Header: "Last access",
        accessor: "last_access",
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
    />
  );
};

export default OrganisationTable;
