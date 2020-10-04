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

const StyledDateSelectContainer = styled.div`
  background-color: ${grey[500]};
  display: flex;
  padding: 10px 20px;
  ${breakpoint("sm")`
    margin-bottom: 30px;
  `}

  margin-left: calc(49% - 50vw);
  width: 100vw;
`;

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

  const [selectedWeek, setSelectedWeek] = useState("All dates");

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
    defaultValues: { dateRange: dateRangeArray[0].dateLabel },
  });

  const { roles } = useContext(UserContext)[0];

  const accessPermission = roles.includes("viewer") || roles.includes("admin");

  if (servicesIsLoading || organisationsIsLoading) {
    return <span>Loading...</span>;
  }

  return accessPermission ? (
    <>
      <StyledDateSelectContainer>
        <div
          style={{
            width: "960px",
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div>
            <p style={{ margin: "0", fontSize: "20px" }}>Select date:</p>
          </div>
          <FormDropDown
            label={""}
            name={"dateRange"}
            register={register}
            options={dateRangeArray.map((date) => date.dateLabel)}
            values={dateRangeArray.map((date) =>
              JSON.stringify({ value: date.dateRaw })
            )}
            blankDefaultValue={false}
            selectStyle={{ margin: "auto 0" }}
            error={errors.dateRange}
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
        </div>
      </StyledDateSelectContainer>
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
