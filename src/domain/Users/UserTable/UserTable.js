import React, { useMemo } from "react";
import { useTable, usePagination } from "react-table";
import { Link } from "@reach/router";
import { roles } from "../../../settings";
import styled from "styled-components";
import { grey } from "../../../settings";
import UserPagination from "../UserPagination/UserPagination";

const StyledTable = styled.table`
  margin-top: 40px;
  width: 100%;
  border-collapse: collapse;
  border-radius: 3px 3px 0px 0px;
`;

const StyledHeadingTr = styled.tr`
  height: 40px;
  background-color: ${grey[700]};
  color: white;
`;

const StyledHeadingTh = styled.th`
  padding: 0;
`;

const StyledBodyTr = styled.tr``;

const StyledTd = styled.td`
  border-left: none;
  border-right: none;
  padding: 5px 0 0 30px;
  height: 50px;
`;

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
    prepareRow,
    page,
    state: { pageIndex },
    pageCount,
    gotoPage,
    previousPage,
    nextPage,
    canPreviousPage,
    canNextPage,
  } = useTable(
    {
      columns,
      data,
    },
    usePagination
  );

  if (isLoading) {
    return <span>Loading</span>;
  }

  let j = 0;

  // Render the UI for your table
  return (
    <>
      <StyledTable {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <StyledHeadingTr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <StyledHeadingTh {...column.getHeaderProps()}>
                  {column.render("Header")}
                </StyledHeadingTh>
              ))}
            </StyledHeadingTr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            j++;
            prepareRow(row);
            return (
              <StyledBodyTr
                {...row.getRowProps()}
                style={{ backgroundColor: j % 2 == 0 ? grey[200] : grey[201] }}
              >
                {row.cells.map((cell) => {
                  return (
                    <StyledTd {...cell.getCellProps()}>
                      {cell.render("Cell")}
                    </StyledTd>
                  );
                })}
              </StyledBodyTr>
            );
          })}
        </tbody>
      </StyledTable>
      <UserPagination
        pageIndex={pageIndex}
        pageCount={pageCount}
        gotoPage={gotoPage}
        previousPage={previousPage}
        nextPage={nextPage}
        canPreviousPage={canPreviousPage}
        canNextPage={canNextPage}
      />
    </>
  );
};

export default UserTable;
