import React, { useEffect, useState, useContext } from "react";
import { Link } from "@reach/router";
import UserTable from "../UserTable/UserTable";
import Search from "../../../components/Search/Search";
import Button from "../../../components/Button/Button";
import UserContext from "../../../context/UserContext/UserContext";
import AccessDenied from "../../Error/AccessDenied/AccessDenied";
import UserService from "../../../services/UserService/UserService";
import { grey, green } from "../../../settings";
import styled from "styled-components";
import { breakpoint } from "../../../utils/breakpoint/breakpoint";
import { CSVLink } from "react-csv";

const StyledActionDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 20px;
  ${breakpoint("sm")`
    flex-direction: row;
    height: 80px;
    padding: 0 10px;
    justify-content: space-between;
    align-items: center;
  `};

  background-color: ${grey[500]};
`;

const StyledButton = styled(Button)`
  margin: auto 0;
`;

const StyledAddUserLink = styled.div`
  margin: 20px 20px 0 0;
  ${breakpoint("sm")`
  margin: 0 20px 0 0;
  `};
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

function cleanDataForExport(data) {
  const newData = data
    .filter((user) => user.status === "active")
    .map((user) => {
      user.organisationName = user.organisation.name;

      if (user.roles.includes("vcso")) {
        user.rolesVcso = "Yes";
      }

      if (user.roles.includes("viewer")) {
        user.rolesViewer = "Yes";
      }

      if (user.roles.includes("admin")) {
        user.rolesAdmin = "Yes";
      }

      return user;
    });
  // console.log(newData);
  return newData;
}

const ListUsers = ({ location }) => {
  const { roles } = useContext(UserContext)[0];

  const [data, setData] = useState([]);
  const [search, setSearch] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      let users = false;
      if (search) {
        users = await UserService.retrieveUsers(
          "name",
          "asc",
          0,
          Infinity,
          search
        );
      } else {
        users = await UserService.retrieveUsers("name", "asc", 0, Infinity, "");
      }
      setData(users || []);
      setIsLoading(false);
    }

    fetchData();
  }, [search, setData, setIsLoading]);

  const accessPermission = roles.includes("viewer") || roles.includes("admin");

  const headersForExport = [
    { label: "ID", key: "id" },
    { label: "Name", key: "name" },
    { label: "Email", key: "email" },
    { label: "Organisation", key: "organisationName" },
    { label: "VCSO user", key: "rolesVcso" },
    { label: "Viewer user", key: "rolesViewer" },
    { label: "Admin user", key: "rolesAdmin" },
    { label: "Status", key: "status" },
  ];

  const dataForExport = cleanDataForExport(data);

  console.log("dataForExport");
  console.log(dataForExport);

  return accessPermission ? (
    <>
      <div>
        <StyledActionDiv>
          <Search setSearch={setSearch} />
          <div style={{ display: "flex", flexDirection: "row" }}>
            <StyledAddUserLink>
              <StyledLink to="/users/add">
                <StyledButton label={"Add user"} padding="15px 30px" />
              </StyledLink>
            </StyledAddUserLink>
            <StyledButton
              label={"Export all users"}
              padding="15px 25px"
              backgroundColor="white"
              color={green[400]}
              border={`1px solid ${green[400]}`}
            />
            <CSVLink
              data={dataForExport}
              headers={headersForExport}
              filename={"portal_users.csv"}
            >
              Download me
            </CSVLink>
          </div>
        </StyledActionDiv>
      </div>
      <UserTable data={data} isLoading={isLoading} search={search} />
    </>
  ) : (
    <AccessDenied />
  );
};

export default ListUsers;
