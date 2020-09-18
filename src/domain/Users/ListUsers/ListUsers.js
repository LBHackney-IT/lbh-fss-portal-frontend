import React, { useEffect, useState, useContext } from "react";
import { Link } from "@reach/router";
import UserTable from "../UserTable/UserTable";
import Search from "../../../components/Search/Search";
import Button from "../../../components/Button/Button";
import UserContext from "../../../context/UserContext/UserContext";
import AccessDenied from "../../Error/AccessDenied/AccessDenied";
import UserService from "../../../services/UserService/UserService";
import { grey } from "../../../settings";
import styled from "styled-components";
import { breakpoint } from "../../../utils/breakpoint/breakpoint";

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
  margin-top: 20px;
  ${breakpoint("sm")`
  margin-top: 0;
  `};
`;

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

  return accessPermission ? (
    <>
      <div>
        <StyledActionDiv>
          <Search setSearch={setSearch} />
          <StyledAddUserLink>
            <Link to="/users/add">
              <StyledButton label={"Add user"} />
            </Link>
          </StyledAddUserLink>
        </StyledActionDiv>
      </div>
      <UserTable data={data} isLoading={isLoading} search={search} />
    </>
  ) : (
    <AccessDenied />
  );
};

export default ListUsers;
