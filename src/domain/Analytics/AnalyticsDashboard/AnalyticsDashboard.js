import React, { useContext, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import AnalyticsTile from "../AnalyticsTile/AnalyticsTile";
import UserContext from "../../../context/UserContext/UserContext";
import AccessDenied from "../../Error/AccessDenied/AccessDenied";
import useAllServiceFetch from "../../../hooks/useAllServiceFetch/useAllServiceFetch";
import useAllOrganisationFetch from "../../../hooks/useAllOrganisationFetch/useAllOrganisationFetch";
import styled from "styled-components";
import { breakpoint } from "../../../utils/breakpoint/breakpoint";
import {
  calcOrganisations,
  calcApprovedOrganisations,
  calcServices,
  calcUnapprovedOrganisation,
  calcDateRange,
} from "../../../utils/functions/analyticsFunctions";
import FormDropDown from "../../../components/FormDropDown/FormDropDown";

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

const AnalyticsDashboard = () => {
  const { services, servicesIsLoading } = useAllServiceFetch();
  const { organisations, organisationsIsLoading } = useAllOrganisationFetch();

  const [values, setValues] = useState({
    organisations: null,
    approvedOrganisations: null,
    services: null,
    unapprovedOrganisation: null,
  });

  const dateRangeArray = calcDateRange();

  const [selectedWeek, setSelectedWeek] = useState(dateRangeArray[0]);

  useEffect(() => {
    const newValues = {};

    newValues.organisations = calcOrganisations(organisations, selectedWeek);

    newValues.approvedOrganisations = calcApprovedOrganisations(
      organisations,
      selectedWeek
    );

    newValues.services = calcServices(services, selectedWeek);

    newValues.unapprovedOrganisation = calcUnapprovedOrganisation(
      organisations,
      selectedWeek
    );

    setValues(newValues);
  }, [services, organisations, selectedWeek, setValues]);

  const { register, handleSubmit, errors, getValues } = useForm({
    defaultValues: { dateRange: dateRangeArray[0] },
  });

  const { roles } = useContext(UserContext)[0];

  const accessPermission = roles.includes("viewer") || roles.includes("admin");

  if (servicesIsLoading || organisationsIsLoading) {
    return <span>Loading...</span>;
  }

  return accessPermission ? (
    <>
      <FormDropDown
        label={""}
        name={"dateRange"}
        register={register}
        options={dateRangeArray}
        error={errors.dateRange}
        onChange={() => setSelectedWeek(getValues().dateRange)}
      />
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
