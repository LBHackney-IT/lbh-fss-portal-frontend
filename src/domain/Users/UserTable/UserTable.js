import React, { useMemo } from "react";
import { Link } from "@reach/router";
import { roles } from "../../../settings";
import styled from "styled-components";
import Table from "../../../components/Table/Table";

const StyledEmailText = styled.p`
  margin-top: 10px;
`;

const StyledUl = styled.ul`
  padding-left: 20px;
`;

const UserTable = ({ data, isLoading, search }) => {
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
        accessor: "organisation",
        Cell: (e) => {
          return (
            <Link to={`/organisations/${e.value.id}/edit`}>
              <StyledEmailText>{e.value.name}</StyledEmailText>
            </Link>
          );
        },
      },
      {
        Header: "Roles",
        accessor: "roles",
        Cell: (e) => {
          return (
            <StyledUl>
              {e.value.map((item, i) => {
                return <li key={i}>{item}</li>;
              })}
            </StyledUl>
          );
        },
      },
      {
        Header: "Member since",
        accessor: "created_at",
        Cell: (e) => {
          const createdAtDate = new Date(e.value);
          return createdAtDate == "Invalid Date"
            ? "Unknown"
            : createdAtDate.toLocaleDateString();
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

export default UserTable;
