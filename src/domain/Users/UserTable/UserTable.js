import React, { useMemo } from "react";
import { useTable } from "react-table";

import { Link } from "@reach/router";
import { roles } from "../../../settings";

const UserTable = ({ data, isLoading }) => {
  const columns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
        Cell: (e) => {
          return <Link to={`/users/${e.row.original.id}/edit`}>{e.value}</Link>;
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
            <ul>
              {e.value.map((item, i) => {
                return <li key={i}>{roles[item]}</li>;
              })}
            </ul>
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

  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data,
  });

  if (isLoading) {
    return <span>Loading</span>;
  }

  // Render the UI for your table
  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>{column.render("Header")}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default UserTable;
