import React, { useMemo } from "react";
import { Link } from "@reach/router";
import styled from "styled-components";
import Table from "../../../components/Table/Table";
import TableActionDropDown from "../../../components/TableActionDropDown/TableActionDropDown";
import { green, red, yellow } from "../../../settings";
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
    width: 75%;
  `};
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
    case "active":
      return {
        title: "Active",
        backgroundColor: green[400],
        color: "white",
      };
      break;
    case "suspended":
      return {
        title: "Suspended",
        backgroundColor: yellow[400],
        color: "black",
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

const ServiceTable = ({
  data,
  search = "",
  actions,
  setSelectedService,
  showPagination,
  actionWidth,
}) => {
  console.log("data");
  console.log(data);
  const columns = useMemo(
    () => [
      {
        Header: "Services",
        accessor: "name",
        Cell: (e) => {
          return (
            <>
              <Link to={`/services/${e.row.original.id}/edit`}>{e.value}</Link>{" "}
            </>
          );
        },
      },
      // {
      //   Header: "User",
      //   accessor: "id",
      //   Cell: (e) => {
      //     return <> {organisationUser[e.value] || "User not found"} </>;
      //   },
      // },
      {
        Header: "Status",
        accessor: "status",
        Cell: (e) => {
          const status = formatStatus(e.value);
          return <StyledStatus status={status}>{status.title}</StyledStatus>;
        },
      },
      {
        Header: "Created",
        accessor: "created_at",
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
                onClick={() => setSelectedService(e.row.original)}
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
    [data]
  );

  return (
    <>
      <Table
        data={data}
        columns={columns}
        isLoading={false}
        search={search}
        tdHeightMobile={"20px"}
        showPagination={showPagination}
      />
    </>
  );
};

export default ServiceTable;
