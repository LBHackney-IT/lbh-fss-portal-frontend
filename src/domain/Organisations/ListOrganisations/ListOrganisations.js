import React, { useEffect, useState, useContext } from "react";
import OrganisationTable from "../OrganisationTable/OrganisationTable";
import Search from "../../../components/Search/Search";
import UserContext from "../../../context/UserContext/UserContext";
import AccessDenied from "../../Error/AccessDenied/AccessDenied";
import OrganisationService from "../../../services/OrganisationService/OrganisationService";
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

const ListOrganisations = ({ location }) => {
  const { roles } = useContext(UserContext)[0];

  const [data, setData] = useState([]);
  const [search, setSearch] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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
      setData(organisations || []);
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
        </StyledActionDiv>
      </div>
      <OrganisationTable data={data} isLoading={isLoading} search={search} />
    </>
  ) : (
    <AccessDenied />
  );
};

export default ListOrganisations;
