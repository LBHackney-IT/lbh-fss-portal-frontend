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
// import { useForm, Controller } from "react-hook-form";
// import ReactDatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const StyledTilesContainer = styled.div`
  margin-bottom: 50px;
  display: flex;
  flex-direction: column;
  ${breakpoint("sm")`
    flex-direction: row;
    justify-content: space-between;
  `}
`;

function grabAllUserServices(data, allUserServices, setAllUserServices) {
  let serviceNamesArray = [];
  if (allUserServices.length === 0) {
    data.forEach((event) => {
      if (!serviceNamesArray.includes(event.serviceName))
        serviceNamesArray.push(event.serviceName);
    });

    setAllUserServices(serviceNamesArray);
  }
}

const MyDashboard = () => {
  const user = useContext(UserContext)[0];
  const [allUserServices, setAllUserServices] = useState([]);
  const [allMetrics, setAllMetrics] = useState([]);
  const [metrics, setMetrics] = useState([]);
  const [dateRange, setDateRange] = useState({
    from_date: null,
    to_date: null,
  });
  const [isLoading, setIsLoading] = useState(true);

  // const { handleSubmit, register, reset, control } = useForm();

  useEffect(() => {
    async function fetchAnalytics() {
      setIsLoading(true);

      const data = await AnalyticsService.retrieveAnalytics(
        user.organisation.id,
        dateRange.from_date,
        dateRange.to_date
      );

      if (data) {
        // set allUserServices
        let serviceNamesArray = [];
        if (allUserServices.length === 0) {
          data.forEach((event) => {
            if (!serviceNamesArray.includes(event.serviceName))
              serviceNamesArray.push(event.serviceName);
          });

          setAllUserServices(serviceNamesArray);
        }

        // set Metrics
        let temp = [];

        serviceNamesArray.forEach((serviceName) => {
          const serviceData = data.filter((event) => {
            return event.serviceName === serviceName;
          });

          temp.push({ serviceName, count: serviceData.length });
        });

        setMetrics(temp);
      } else {
        toast.error(`Failed to retrieve analytics.`);
        navigate("/service");
      }

      setIsLoading(false);
    }

    fetchAnalytics();
  }, [setMetrics, setIsLoading]);

  if (isLoading) {
    return <AppLoading />;
  }

  return (
    <>
      <StyledTilesContainer>
        {metrics.map((metric, index) => {
          return (
            <div key={index} style={{ width: "25%", margin: "0 10px" }}>
              <AnalyticsTile
                label={<>Total views of {metric.serviceName}</>}
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
