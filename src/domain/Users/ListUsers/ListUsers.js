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
import { checkIsInternalTeam } from "../../../utils/functions/functions";
import { CSVLink } from "react-csv";

const StyledActionDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 20px;
  ${breakpoint("md")`
    flex-direction: row;
    height: 80px;
    padding: 0 10px;
    justify-content: space-between;
    align-items: center;
  `};

  background-color: ${grey[500]};
`;

const StyledButtonDiv = styled.div`
  display: flex;
  flex-direction: column;
  @media (min-width: 435px) {
    flex-direction: row;
  }
`;

const StyledButton = styled(Button)`
  margin: auto 0;
  width: 160px;
  padding: 12px 15px;
  @media (min-width: 435px) {
    padding: 12px 0px;
  }
`;

const StyledCSVLink = styled(CSVLink)`
  text-decoration: none;
  margin: 10px 20px 0 0;
  @media (min-width: 435px) {
    margin: 10px 20px 0 0;
  }

  ${breakpoint("md")`
    margin-top: 0;
  `}
`;

const StyledAddUserLink = styled.div`
  margin: 10px 20px 0 0;
  ${breakpoint("md")`
    margin: 0 20px 0 0;
  `};
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

function cleanDataForExport(data) {
  data.forEach((user) => {
    user.roles = user.roles.map((role) => {
      return role.toLowerCase();
    });
  });

  const newData = data
    .filter((user) => user.status.toLowerCase() === "active")
    .map((user) => {
      user.organisationName = user.organisation ? user.organisation.name : "";

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

  return newData;
}

const ListUsers = ({ location }) => {
  const { roles } = useContext(UserContext)[0];

  const [data, setData] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [search, setSearch] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      let users = false;
      if (search) {
        users = await UserService.retrieveUsers("name", "asc", 0, 9999, search);
      } else {
        users = await UserService.retrieveUsers("name", "asc", 0, 9999, "");
        setAllUsers(users);
      }

      if (users) {
        users = users.filter((user) => user.status !== "deleted");
      }

      setData(users || []);
      setIsLoading(false);
    }

    fetchData();
  }, [search, setData, setAllUsers, setIsLoading]);

  const isInternalTeam = checkIsInternalTeam(roles);

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

  const dataForExport = cleanDataForExport(allUsers);

  return isInternalTeam ? (
    <>
      <div>
        <StyledActionDiv>
          <Search setSearch={setSearch} />
          <StyledButtonDiv>
            <StyledAddUserLink>
              <StyledLink to="/users/add">
                <StyledButton label={"Add user"} />
              </StyledLink>
            </StyledAddUserLink>
            <StyledCSVLink
              data={dataForExport}
              headers={headersForExport}
              filename={"portal_users.csv"}
            >
              <StyledButton
                label={"Export users"}
                backgroundColor="white"
                color={green[400]}
                border={`1px solid ${green[400]}`}
              />
            </StyledCSVLink>
          </StyledButtonDiv>
        </StyledActionDiv>
      </div>
      <UserTable data={data} isLoading={isLoading} search={search} />
    </>
  ) : (
    <AccessDenied />
  );
};

export default ListUsers;
