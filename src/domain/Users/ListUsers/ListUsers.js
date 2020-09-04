import React, { useEffect, useState, useContext } from "react";
import { Link } from "@reach/router";
import UserTable from "../UserTable/UserTable";
import SearchUser from "../SearchUser/SearchUser";
import Button from "../../../components/Button/Button";
import UserContext from "../../../context/UserContext/UserContext";
import AccessDenied from "../../Error/AccessDenied/AccessDenied";
import UserService from "../../../services/UserService/UserService";
import { grey } from "../../../settings";
import styled from "styled-components";

const StyledActionDev = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: "center";
  padding: "5px";
  background-color: ${grey[500]};
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
        users = await UserService.retrieveUsers("name", "asc", 0, 10, search);
      } else {
        users = await UserService.retrieveUsers();
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
        <h1>Users</h1>
        <StyledActionDev>
          <SearchUser setSearch={setSearch} />
          <Link to="/users/add">
            <Button label={"Add user"} />
          </Link>
        </StyledActionDev>
      </div>
      <UserTable data={data} isLoading={isLoading} /> :
    </>
  ) : (
    <AccessDenied />
  );
};

export default ListUsers;
