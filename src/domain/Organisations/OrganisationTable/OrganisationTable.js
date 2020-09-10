import React, { useMemo } from "react";
import { Link } from "@reach/router";
import styled from "styled-components";
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
        Header: "Organisation",
        accessor: "name",
        Cell: (e) => {
          return (
            <>
              <Link to={`/organisations/${e.row.original.id}/edit`}>
                {e.value}
              </Link>
              <StyledEmailText>{e.row.original.email}</StyledEmailText>
            </>
          );
        },
      },
      {
        Header: "Status",
        accessor: "status",
      },
      {
        Header: "Submitted",
        accessor: "submitted_at",
      },
      {
        Header: "Action",
        Cell: (e) => {
          return (
            <>
              <form></form>
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
    />
  );
};

export default OrganisationTable;
