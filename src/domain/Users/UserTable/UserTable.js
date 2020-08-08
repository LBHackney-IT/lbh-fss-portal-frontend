import React, { useEffect, useState, useMemo } from "react";
import { useTable } from "react-table";
import UserService from "../../../services/UserService/UserService";

const UserTable = () => {
  const columns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Organisation",
        accessor: "organisation",
      },
      {
        Header: "Roles",
        accessor: "roles",
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

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const users = await UserService.retrieveUsers();

      setData(users);
      setIsLoading(false);
    }

    fetchData();
  }, []);

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
    return <span>Loading...</span>;
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
