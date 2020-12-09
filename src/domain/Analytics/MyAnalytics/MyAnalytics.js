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

const StyledTilesContainer = styled.div`
  margin-bottom: 50px;
  display: flex;
  flex-direction: column;
  ${breakpoint("sm")`
    flex-direction: row;
    justify-content: space-between;
  `}
`;

function grabUniqueUserServices(
  data,
  uniqueUserServices,
  setUniqueUserServices
) {
  let serviceNamesArray = [];
  if (uniqueUserServices.length === 0) {
    data.forEach((event) => {
      if (!serviceNamesArray.includes(event.serviceName))
        serviceNamesArray.push(event.serviceName);
    });

    setUniqueUserServices(serviceNamesArray);
  }
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

  useEffect(() => {
    async function fetchAnalytics() {
      setIsLoading(true);

      let data = false;

      if (uniqueUserServices.length === 0) {
        data = await AnalyticsService.retrieveAnalytics({
          id: user.organisation.id,
          from_date: null,
          to_date: null,
        });

        grabUniqueUserServices(data, uniqueUserServices, setUniqueUserServices);
      } else {
        data = await AnalyticsService.retrieveAnalytics({
          id: user.organisation.id,
          from_date: dateRange.from_date,
          to_date: dateRange.to_date,
        });
      }

      if (data) {
        setFilteredUserServices(data);
      } else {
        toast.error(`Failed to retrieve analytics.`);
        navigate("/service");
      }

      setIsLoading(false);
    }

    fetchAnalytics();
  }, [user, dateRange, setFilteredUserServices, setIsLoading]);

  useEffect(() => {
    calculateMetrics(uniqueUserServices, filteredUserServices, setMetrics);
  }, [uniqueUserServices, filteredUserServices, setMetrics]);

  if (isLoading) {
    return (
      <>
        <DateSelector dateRange={dateRange} setDateRange={setDateRange} />;
        <AppLoading />
      </>
    );
  }

  return (
    <>
      <DateSelector dateRange={dateRange} setDateRange={setDateRange} />
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
