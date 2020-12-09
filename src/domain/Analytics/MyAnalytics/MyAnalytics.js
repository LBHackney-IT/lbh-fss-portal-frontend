import { navigate } from "@reach/router";
import React, { useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";
import AppLoading from "../../../AppLoading";
import UserContext from "../../../context/UserContext/UserContext";
import AnalyticsService from "../../../services/AnalyticsService/AnalyticsService";
import AnalyticsTile from "../AnalyticsTile/AnalyticsTile";
import { breakpoint } from "../../../utils/breakpoint/breakpoint";
import DateSelector from "../DateSelector/DateSelector";
import ServiceService from "../../../services/ServiceService/ServiceService";

const StyledTilesContainer = styled.div`
  margin-bottom: 50px;
  display: flex;
  flex-direction: column;
  ${breakpoint("sm")`
    flex-direction: row;
    justify-content: space-between;
  `}
`;

function grabUniqueUserServices(user, services, setUniqueUserServices) {
  let serviceNamesArray = [];
  services.forEach((service) => {
    // NOTE - currently a service only has a single user, when this
    // is changed so that a service has an array of users, will need
    // to update the line of code below, probably to 'service.user_id.includes(user.id)'
    if (service.user_id === user.id) {
      serviceNamesArray.push(service.name);
    }
  });
  setUniqueUserServices(serviceNamesArray);
}

function calculateMetrics(
  uniqueUserServices,
  filteredUserServices,
  setMetrics
) {
  let calculatedMetrics = [];

  uniqueUserServices.forEach((service) => {
    const eventArray = filteredUserServices.filter((event) => {
      return event.serviceName === service;
    });

    calculatedMetrics.push({ service: service, count: eventArray.length });
  });

  setMetrics(calculatedMetrics);
}

const MyAnalytics = () => {
  const user = useContext(UserContext)[0];
  const [uniqueUserServices, setUniqueUserServices] = useState([]);
  const [filteredUserServices, setFilteredUserServices] = useState([]);
  const [metrics, setMetrics] = useState([]);
  const [dateRange, setDateRange] = useState({
    from_date: null,
    to_date: null,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [dateError, setDateError] = useState("");

  useEffect(() => {
    async function fetchAllData() {
      setIsLoading(true);

      const services = await ServiceService.retrieveServices({
        limit: 9999,
      });

      const data = await AnalyticsService.retrieveAnalytics({
        id: user.organisation.id,
        from_date: null,
        to_date: null,
      });

      if (data && services) {
        grabUniqueUserServices(user, services, setUniqueUserServices);

        setFilteredUserServices(data);
      } else {
        toast.error(`Failed to retrieve analytics.`);
        navigate("/service");
      }

      setIsLoading(false);
    }

    fetchAllData();
  }, [user, setFilteredUserServices, setIsLoading]);

  useEffect(() => {
    async function fetchFilteredData() {
      setIsLoading(true);

      const data = await AnalyticsService.retrieveAnalytics({
        id: user.organisation.id,
        from_date: dateRange.from_date,
        to_date: dateRange.to_date,
      });

      if (data) {
        setFilteredUserServices(data);
      } else {
        toast.error(`Failed to retrieve analytics.`);
        navigate("/service");
      }

      setIsLoading(false);
    }

    if (!dateError && uniqueUserServices.length > 0) fetchFilteredData();
  }, [user, dateRange, setFilteredUserServices, setIsLoading]);

  useEffect(() => {
    calculateMetrics(uniqueUserServices, filteredUserServices, setMetrics);
  }, [uniqueUserServices, filteredUserServices, setMetrics]);

  if (isLoading) {
    return (
      <>
        <DateSelector
          dateRange={dateRange}
          setDateRange={setDateRange}
          dateError={dateError}
          setDateError={setDateError}
        />
        <AppLoading />
      </>
    );
  }

  if (uniqueUserServices.length === 0) {
    return (
      <>
        <DateSelector
          dateRange={dateRange}
          setDateRange={setDateRange}
          dateError={dateError}
          setDateError={setDateError}
        />
        <h1 style={{ margin: "30px 0 60px 0" }}>No services available</h1>
      </>
    );
  }

  return (
    <>
      <DateSelector
        dateRange={dateRange}
        setDateRange={setDateRange}
        dateError={dateError}
        setDateError={setDateError}
      />
      <StyledTilesContainer>
        {metrics.map((metric, index) => {
          return (
            <div key={index} style={{ width: "25%", margin: "0 10px" }}>
              <AnalyticsTile
                label={`Total views of ${metric.service}`}
                value={metric.count}
              />
            </div>
          );
        })}
      </StyledTilesContainer>
    </>
  );
};

export default MyAnalytics;
