import React, { useContext, useMemo } from "react";
import { Link } from "@reach/router";
import styled from "styled-components";
import Table from "../../../components/Table/Table";
import TableActionDropDown from "../../../components/TableActionDropDown/TableActionDropDown";
import { green, red, yellow } from "../../../settings";
import { breakpoint } from "../../../utils/breakpoint/breakpoint";
import UserContext from "../../../context/UserContext/UserContext";
import { checkIsInternalTeam } from "../../../utils/functions/functions";

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
  marginTop,
}) => {
  const user = useContext(UserContext)[0];

  const isInternalTeam = checkIsInternalTeam(user.roles);

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
      {
        Header: "Organisation",
        accessor: "organisation_name",
      },
      // {
      //   Header: "User",
      //   accessor: "user_name",
      //   Cell: (e) => {
      //     if (!isInternalTeam) {
      //       return e.value;
      //     }

      //     if (e.value) {
      //       return (
      //         <Link to={`/users/${e.row.original.user_id}/edit`}>
      //           {e.value}
      //         </Link>
      //       );
      //     } else {
      //       return "User not found";
      //     }
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
      <div style={{ marginBottom: "20px" }}>
        <Table
          data={data}
          columns={columns}
          isLoading={false}
          search={search}
          tdHeightMobile={"20px"}
          marginTop={marginTop}
          showPagination={showPagination}
        />
      </div>
    </>
  );
};

export default ServiceTable;
