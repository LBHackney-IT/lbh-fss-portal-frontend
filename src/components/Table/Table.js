import React from "react";
import styled from "styled-components";
import Pagination from "../Pagination/Pagination";
import { grey } from "../../settings";
import { breakpoint } from "../../utils/breakpoint/breakpoint";
import { useTable, usePagination } from "react-table";

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  border-radius: 3px 3px 0px 0px;
  margin-top: 10px;
  ${breakpoint("md")`
    margin-top: 40px;
  `};
`;

const StyledThead = styled.thead`
  display: none;
  ${breakpoint("md")`
    display: table-header-group;
  `};
`;

const StyledHeadingTr = styled.tr`
  height: 40px;
  background-color: ${grey[700]};
  color: white;
`;

const StyledHeadingTh = styled.th`
  padding: 0;
  text-align: left;
  padding-left: 15px;
  font-weight: normal;
`;

const StyledBodyTr = styled.tr`
  display: flex;
  flex-direction: column;
  margin: 10px 0;
  padding: 20px 0;
  ${breakpoint("sm")`
    padding: 15px 20px;
  `};
  ${breakpoint("md")`
    display:table-row;
    margin: 0;
    padding: 0;
  `};
`;

const StyledTd = styled.td`
  border-left: none;
  border-right: none;
  padding: 5px 0 0 15px;
  margin-top: 10px;
  ${breakpoint("md")`
    height: 50px;
    margin-top: 0;
  `};
`;

const StyledTableHeading = styled.span`
  font-weight: 600;
  margin-right: 10px;
  ${breakpoint("md")`
    display: none;
    margin-right: 0;
  `};
`;

const Table = ({ data, columns, isLoading, search }) => {
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

  let pageMinIndex = 0;
  let pageMaxIndex = 0;

  if (page.length > 0) {
    pageMinIndex =
      page.reduce(
        (min, page) => (page.index < min ? page.index : min),
        page[0].index
      ) + 1;

    pageMaxIndex =
      page.reduce(
        (max, page) => (page.index > max ? page.index : max),
        page[0].index
      ) + 1;
  }

  let j = 0;

  // Render the UI for your table
  return (
    <>
      {page.length > 0 ? (
        <>
          <StyledTable {...getTableProps()}>
            <StyledThead>
              {headerGroups.map((headerGroup) => (
                <StyledHeadingTr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <StyledHeadingTh
                      {...column.getHeaderProps()}
                      data-testid="columnheader"
                    >
                      {column.render("Header")}
                    </StyledHeadingTh>
                  ))}
                </StyledHeadingTr>
              ))}
            </StyledThead>
            <tbody {...getTableBodyProps()}>
              {page.map((row, i) => {
                j++;
                prepareRow(row);
                return (
                  <StyledBodyTr
                    key={row.id}
                    {...row.getRowProps()}
                    style={{
                      backgroundColor: j % 2 === 0 ? grey[200] : grey[201],
                    }}
                    data-testid="row"
                  >
                    {row.cells.map((cell, index) => {
                      return (
                        <StyledTd {...cell.getCellProps()} key={index}>
                          <div>
                            <StyledTableHeading>
                              {cell.column.Header}
                            </StyledTableHeading>
                            {cell.column.Header === "name" ? <br /> : null}
                            {cell.render("Cell")}
                          </div>
                        </StyledTd>
                      );
                    })}
                  </StyledBodyTr>
                );
              })}
            </tbody>
          </StyledTable>
          <Pagination
            pageMinIndex={pageMinIndex}
            pageMaxIndex={pageMaxIndex}
            totalEntries={data.length}
            pageIndex={pageIndex}
            pageCount={pageCount}
            gotoPage={gotoPage}
            previousPage={previousPage}
            nextPage={nextPage}
            canPreviousPage={canPreviousPage}
            canNextPage={canNextPage}
          />
        </>
      ) : (
        <h1>No users found matching '{search}'</h1>
      )}
    </>
  );
};

export default Table;
