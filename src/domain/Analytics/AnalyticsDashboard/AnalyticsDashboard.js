import React, { useContext, useState, useEffect } from "react";
import AnalyticsTile from "../AnalyticsTile/AnalyticsTile";
import UserContext from "../../../context/UserContext/UserContext";
import AccessDenied from "../../Error/AccessDenied/AccessDenied";
import useAllServiceFetch from "../../../hooks/useAllServiceFetch/useAllServiceFetch";
import useAllOrganisationFetch from "../../../hooks/useAllOrganisationFetch/useAllOrganisationFetch";
import styled from "styled-components";
import { breakpoint } from "../../../utils/breakpoint/breakpoint";

const StyledHr = styled.hr`
  border: 3px solid #000000;
  background-color: black;
  width: 95%;
  margin: 50px auto;
`;

const StyledTilesContainer = styled.div`
  margin-bottom: 50px;
  display: flex;
  flex-direction: column;
  ${breakpoint("sm")`
    flex-direction: row;
    justify-content: space-between;
  `}
`;

const calcOrganisations = (organisations) => {
  let organisationsValue = organisations.length;
  return organisationsValue;
};

const calcApprovedOrganisations = (organisations) => {
  let approvedOrganisationsValue = organisations.filter((organisation) => {
    return organisation.status === "published";
  }).length;

  return approvedOrganisationsValue;
};

const calcServices = (services) => {
  let servicesValue = services.length;
  return servicesValue;
};

const calcUnapprovedOrganisation = (organisations) => {
  let unpprovedOrganisationsValue = organisations.filter((organisation) => {
    return (
      organisation.status !== "published" && organisation.status !== "rejected"
    );
  }).length;

  return unpprovedOrganisationsValue;
};

const calcDateRange = () => {
  const today = new Date();

  return;
};

const AnalyticsDashboard = () => {
  const { services, servicesIsLoading } = useAllServiceFetch();
  const { organisations, organisationsIsLoading } = useAllOrganisationFetch();

  const [values, setValues] = useState({
    organisations: null,
    approvedOrganisations: null,
    services: null,
    unapprovedOrganisation: null,
  });

  const [dateRange, setDateRange] = useState();

  useEffect(() => {
    const newValues = {};

    newValues.organisations = calcOrganisations(organisations);

    newValues.approvedOrganisations = calcApprovedOrganisations(organisations);

    newValues.services = calcServices(services);

    newValues.unapprovedOrganisation = calcUnapprovedOrganisation(
      organisations
    );

    setValues(newValues);
  }, [services, organisations, setValues]);

  const { roles } = useContext(UserContext)[0];

  const accessPermission = roles.includes("viewer") || roles.includes("admin");

  if (servicesIsLoading || organisationsIsLoading) {
    return <span>Loading...</span>;
  }

  return accessPermission ? (
    <>
      <StyledTilesContainer>
        <AnalyticsTile
          label="Total number of organisations"
          value={values.organisations}
          color={"green"}
        />
        <AnalyticsTile
          label="Number of approved organisations"
          value={values.approvedOrganisations}
          color={"green"}
        />
        <AnalyticsTile
          label="Number of services submitted"
          value={values.services}
          color={"green"}
        />
      </StyledTilesContainer>
      <StyledHr />
      <StyledTilesContainer>
        <AnalyticsTile
          label="Number of organisations waiting approval"
          value={values.unapprovedOrganisation}
          color={"yellow"}
        />
      </StyledTilesContainer>
    </>
  ) : (
    <AccessDenied />
  );
};

export default AnalyticsDashboard;
