import React, { useContext, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import AnalyticsTile from "../AnalyticsTile/AnalyticsTile";
import UserContext from "../../../context/UserContext/UserContext";
import AccessDenied from "../../Error/AccessDenied/AccessDenied";
import useAllServiceFetch from "../../../hooks/useAllServiceFetch/useAllServiceFetch";
import useAllOrganisationFetch from "../../../hooks/useAllOrganisationFetch/useAllOrganisationFetch";
import styled from "styled-components";
import { applyStyleModifiers } from 'styled-components-modifiers';
import { breakpoint } from "../../../utils/breakpoint/breakpoint";
import { grey } from "../../../settings";
import {
  calcOrganisations,
  calcApprovedOrganisations,
  calcServices,
  calcUnapprovedOrganisation,
  calcNeighbourhoods,
  calcTotalNeighbourhoods,
  calcDateRange,
} from "../../../utils/functions/analyticsFunctions";
import FormDropDown from "../../../components/FormDropDown/FormDropDown";
import moment from "moment";
import { checkIsInternalTeam } from "../../../utils/functions/functions";
import AppLoading from "../../../AppLoading";

const StyledDateSelectOuterContainer = styled.div`
  background-color: ${grey[500]};
  display: flex;
  height: 110px;
  margin: -30px 0 0 0;
  ${breakpoint("sm")`
    margin-bottom: 30px;
  `}
  ${breakpoint("md")`
    height: 80px;
  `}

  width: 100vw;
  margin-left: calc(-50vw + 50%);
`;

const StyledSelectorTitleDiv = styled.div`
  display: flex;
  align-items: center;
`;

const StyledSelectorTitle = styled.p`
  margin: 10px 0 0 0;
  font-size: 20px;
  ${breakpoint("sm")`
    margin: 0 10px 0 0;
  `}
`;

const StyledDateSelectInnerContainer = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  width: 90%;
  margin: 0 35px;
  ${breakpoint("sm")`
    width: 100%;
    margin: 15px 18px;
  `};
  ${breakpoint("md")`
    margin: 0 auto;
    flex-direction: row;
    width: 960px;
    padding: 0 20px;
  `};
  @media (min-width: 1000px) {
    padding: 0;
  }
`;

const StyledHr = styled.hr`
  border: 3px solid #000000;
  background-color: black;
  width: 99%;
  margin: 50px auto;
`;

export const CONTAINER_MODIFIER = {
  last: () => `
      margin-bottom: 50px;
  `
}

const StyledTilesContainer = styled.div`
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
  ${breakpoint("sm")`
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: wrap;
  `}
  ${applyStyleModifiers(CONTAINER_MODIFIER)};
`;

const AnalyticsDashboard = () => {
  const { services, servicesIsLoading } = useAllServiceFetch();
  const { organisations, organisationsIsLoading } = useAllOrganisationFetch();

  const [values, setValues] = useState({
    organisations: null,
    approvedOrganisations: null,
    services: null,
    unapprovedOrganisation: null,
    neighbourhoods: null,
  });

  const dateRangeArray = calcDateRange();

  const [selectedWeek, setSelectedWeek] = useState(["All dates"]);

  useEffect(() => {
    const newValues = {};

    newValues.organisations = calcOrganisations(organisations, selectedWeek);

    newValues.approvedOrganisations = calcApprovedOrganisations(organisations, selectedWeek);

    newValues.services = calcServices(services, selectedWeek);

    newValues.unapprovedOrganisation = calcUnapprovedOrganisation(organisations, selectedWeek);

    newValues.neighbourhoodNE1 = calcTotalNeighbourhoods(services, "NORTH EAST 1");
    newValues.neighbourhoodNE2 = calcTotalNeighbourhoods(services, "NORTH EAST 2");
    newValues.neighbourhoodNW1 = calcTotalNeighbourhoods(services, "NORTH WEST 1");
    newValues.neighbourhoodNW2 = calcTotalNeighbourhoods(services, "NORTH WEST 2");
    newValues.neighbourhoodSE1 = calcTotalNeighbourhoods(services, "SOUTH EAST 1");
    newValues.neighbourhoodSE2 = calcTotalNeighbourhoods(services, "SOUTH EAST 2");
    newValues.neighbourhoodSW1 = calcTotalNeighbourhoods(services, "SOUTH WEST 1");
    newValues.neighbourhoodSW2 = calcTotalNeighbourhoods(services, "SOUTH WEST 2");

    setValues(newValues);
  }, [services, organisations, selectedWeek, setValues]);

  const { register, getValues } = useForm({
    defaultValues: { dateRange: JSON.stringify({ value: ["All dates"] }) },
  });

  const { roles } = useContext(UserContext)[0];

  const isInternalTeam = checkIsInternalTeam(roles);

  if (servicesIsLoading || organisationsIsLoading) {
    return <AppLoading />;
  }

  return isInternalTeam ? (
    <>
      <StyledDateSelectOuterContainer>
        <StyledDateSelectInnerContainer>
          <StyledSelectorTitleDiv>
            <StyledSelectorTitle>Select date:</StyledSelectorTitle>
          </StyledSelectorTitleDiv>
          <FormDropDown
            label={""}
            name={"dateRange"}
            register={register}
            options={dateRangeArray.map((date) => date.dateLabel)}
            values={dateRangeArray.map((date) =>
              JSON.stringify({ value: date.dateRaw })
            )}
            includeBlankValue={false}
            selectStyle={{
              boxShadow: "4px 4px 4px rgba(0, 30, 58, 0.05)",
              borderRadius: "2px",
            }}
            selectMarginMobile="0"
            selectMarginMedium="auto 0"
            onChange={() => {
              const selectedWeekDateRange = JSON.parse(getValues().dateRange)
                .value;

              if (selectedWeekDateRange[0].search("All dates") === -1) {
                setSelectedWeek([
                  moment.utc(selectedWeekDateRange[0]),
                  moment.utc(selectedWeekDateRange[1]),
                ]);
              } else {
                setSelectedWeek(["All dates"]);
              }
            }}
          />
        </StyledDateSelectInnerContainer>
      </StyledDateSelectOuterContainer>
      <StyledTilesContainer>
        <AnalyticsTile
          label="Total number of organisations"
          value={values.organisations}
          color={"green"}
          col={"col-3"}
        />
        <AnalyticsTile
          label="Number of approved organisations"
          value={values.approvedOrganisations}
          color={"green"}
          col={"col-3"}
        />
        <AnalyticsTile
          label="Number of services submitted"
          value={values.services}
          color={"green"}
          col={"col-3"}
        />
      </StyledTilesContainer>
      <StyledHr />
      <StyledTilesContainer>
        <AnalyticsTile
          label="Number of organisations waiting approval"
          value={values.unapprovedOrganisation}
          color={"yellow"}
          col={"col-3"}
        />
      </StyledTilesContainer>
      <StyledHr />
      <h2>NHS Neighbourhood</h2>
      <StyledTilesContainer>
        <AnalyticsTile
          label="Springfield Park Neighbourhood"
          shortLabel="NE1"
          value={values.neighbourhoodNE1.count}
          color={"green"}
          col={"col-4"}
        />
        <AnalyticsTile
          label="Hackney Downs Neighbourhood"
          shortLabel="NE2"
          value={values.neighbourhoodNE2.count}
          color={"green"}
          col={"col-4"}
        />
        <AnalyticsTile
          label="Woodberry Wetlands Neighbourhood"
          shortLabel="NW1"
          value={values.neighbourhoodNW1.count}
          color={"green"}
          col={"col-4"}
        />
        <AnalyticsTile
          label="Clissold Park Neighbourhood"
          shortLabel="NW2"
          value={values.neighbourhoodNW2.count}
          color={"green"}
          col={"col-4"}
        />
      </StyledTilesContainer>
      <StyledTilesContainer modifiers="last">
        <AnalyticsTile
          label="Hackney Marshes Neighbourhood"
          shortLabel="SE1"
          value={values.neighbourhoodSE1.count}
          color={"green"}
          col={"col-4"}
        />
        <AnalyticsTile
          label="Well Street Common Neighbourhood"
          shortLabel="SE2"
          value={values.neighbourhoodSE2.count}
          color={"green"}
          col={"col-4"}
        />
        <AnalyticsTile
          label="London Fields Neighbourhood"
          shortLabel="SW1"
          value={values.neighbourhoodSW1.count}
          color={"green"}
          col={"col-4"}
        />
        <AnalyticsTile
          label="Shoreditch Park &amp; The City Neighbourhood"
          shortLabel="SW2"
          value={values.neighbourhoodSW2.count}
          color={"green"}
          col={"col-4"}
        />
      </StyledTilesContainer>
    </>
  ) : (
    <AccessDenied />
  );
};

export default AnalyticsDashboard;
