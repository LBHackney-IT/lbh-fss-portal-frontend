import React, { useContext, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import AnalyticsTile from "../AnalyticsTile/AnalyticsTile";
import UserContext from "../../../context/UserContext/UserContext";
import AccessDenied from "../../Error/AccessDenied/AccessDenied";
import useAllServiceFetch from "../../../hooks/useAllServiceFetch/useAllServiceFetch";
import useAllOrganisationFetch from "../../../hooks/useAllOrganisationFetch/useAllOrganisationFetch";
import styled from "styled-components";
import { breakpoint } from "../../../utils/breakpoint/breakpoint";
import { grey } from "../../../settings";
import {
  calcOrganisations,
  calcApprovedOrganisations,
  calcServices,
  calcUnapprovedOrganisation,
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

  const [selectedWeek, setSelectedWeek] = useState(["All dates"]);

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
