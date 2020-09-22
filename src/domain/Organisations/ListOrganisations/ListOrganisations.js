import React, { useEffect, useState, useContext, useMemo } from "react";
import OrganisationTable from "../OrganisationTable/OrganisationTable";
import Search from "../../../components/Search/Search";
import Button from "../../../components/Button/Button";
import UserContext from "../../../context/UserContext/UserContext";
import AccessDenied from "../../Error/AccessDenied/AccessDenied";
import OrganisationService from "../../../services/OrganisationService/OrganisationService";
import { grey } from "../../../settings";
import styled from "styled-components";
import { breakpoint } from "../../../utils/breakpoint/breakpoint";
import UserService from "../../../services/UserService/UserService";

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

const ListOrganisations = ({ location }) => {
  const { roles } = useContext(UserContext)[0];

  const [search, setSearch] = useState(false);

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [organisationUser, setOrganisationUser] = useState({});
  const [organisationUserIsLoading, setOrganisationUserIsLoading] = useState(
    true
  );

  useEffect(() => {
    async function fetchOrganisationUser() {
      const users = await UserService.retrieveUsers(
        "name",
        "asc",
        0,
        Infinity,
        ""
      );

      setOrganisationUserIsLoading(false);

      let organisationUserObject = {};

      if (users) {
        Object.keys(users).forEach((key) => {
          const organisationId = users[key].organisation.id;
          const userName = users[key].name;
          organisationUserObject[organisationId] = userName;
        });

        setOrganisationUser(organisationUserObject);
      }
    }

    fetchOrganisationUser();
  }, [setOrganisationUser, setOrganisationUserIsLoading]);

  useEffect(() => {
    async function fetchData() {
      let organisations = false;

      if (search) {
        organisations = await OrganisationService.retrieveOrganisations({
          limit: Infinity,
          search: search,
        });
      } else {
        organisations = await OrganisationService.retrieveOrganisations({
          limit: Infinity,
          search: "",
        });
      }

      setIsLoading(false);

      setData(organisations || []);
    }

    fetchData();
  }, [search, setData, setIsLoading]);

  const accessPermission = roles.includes("viewer") || roles.includes("admin");

  if (isLoading || organisationUserIsLoading) {
    return <span>Loading</span>;
  }

  return accessPermission ? (
    <>
      <div>
        <StyledActionDiv>
          <Search setSearch={setSearch} />
        </StyledActionDiv>
      </div>
      <OrganisationTable
        data={data}
        organisationUser={organisationUser}
        isLoading={isLoading}
        search={search}
      />
    </>
  ) : (
    <AccessDenied />
  );
};

export default ListOrganisations;
