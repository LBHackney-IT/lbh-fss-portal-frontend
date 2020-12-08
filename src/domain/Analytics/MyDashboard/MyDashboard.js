import { navigate } from "@reach/router";
import React, { useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";
import AppLoading from "../../../AppLoading";
import UserContext from "../../../context/UserContext/UserContext";
import AnalyticsService from "../../../services/AnalyticsService/AnalyticsService";
import ServiceService from "../../../services/ServiceService/ServiceService";
import AnalyticsTile from "../AnalyticsTile/AnalyticsTile";
import { breakpoint } from "../../../utils/breakpoint/breakpoint";
import FormError from "../../../components/FormError/FormError";
import Button from "../../../components/Button/Button";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { green, grey } from "../../../settings";

const StyledActionDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 20px;
  margin-bottom: 20px;
  ${breakpoint("md")`
    flex-direction: row;
    height: 80px;
    padding: 0 10px;
    align-items: center;
    margin-bottom: 40px;
  `};

  background-color: ${grey[500]};
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

const DatePickerContainer = styled.div`
  margin-right: 20px;
  .date-picker {
    border: 1px solid black;
    border-radius: 3px;
    padding: 10px 5px;
  }
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

const DateInput = ({ value, onClick }) => (
  <button
    style={{
      cursor: "pointer",
      padding: "20px",
      border: "0",
      borderRadius: "4px",
      backgroundColor: "#20907719",
      font: "inherit",
      color: "black",
    }}
    onClick={onClick}
  >
    {value}
  </button>
);

const MyDashboard = () => {
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
    return <AppLoading />;
  }

  console.log("-----");
  console.log(dateRange.from_date);
  console.log(dateRange.to_date);

  return (
    <>
      <StyledActionDiv>
        <DatePickerContainer>
          <DatePicker
            selected={dateRange.from_date}
            onChange={(date) => {
              if (date && dateRange.to_date && date > dateRange.to_date) {
                setDateError("Invalid date range");
                setDateRange({ ...dateRange, ["from_date"]: null });
                return;
              }
              setDateError("");
              setDateRange({ ...dateRange, ["from_date"]: date });
            }}
            placeholderText="From date"
            dateFormat="dd/MM/yyyy"
            isClearable
            className="date-picker"
          />
        </DatePickerContainer>
        <DatePickerContainer>
          <DatePicker
            selected={dateRange.to_date}
            onChange={(date) => {
              if (date && dateRange.to_date && date < dateRange.from_date) {
                setDateError("Invalid date range");
                setDateRange({ ...dateRange, ["to_date"]: null });
                return;
              }
              setDateError("");
              setDateRange({ ...dateRange, ["to_date"]: date });
            }}
            placeholderText="To date"
            dateFormat="dd/MM/yyyy"
            isClearable
            className="date-picker"
          />
        </DatePickerContainer>
        {dateError ? <FormError error={dateError} marginBottom="0" /> : null}
      </StyledActionDiv>

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

export default MyDashboard;
