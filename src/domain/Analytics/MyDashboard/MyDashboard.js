import React, { useContext, useState, useEffect } from "react";
import AppLoading from "../../../AppLoading";
import UserContext from "../../../context/UserContext/UserContext";
import AnalyticsService from "../../../services/AnalyticsService/AnalyticsService";
import ServiceService from "../../../services/ServiceService/ServiceService";

const MyDashboard = () => {
  const user = useContext(UserContext)[0];

  const [metrics, setMetrics] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [services, setServices] = useState([]);
  const [servicesIsLoading, setServicesIsLoading] = useState(true);

  const [userServices, setUserServices] = useState([]);
  const [userServicesHasUpdated, setUserServicesHasUpdated] = useState(false);

  const [retrieveServices, setRetrieveServices] = useState(true);

  const [search, setSearch] = useState("");

  function doRetrieveServices() {
    setRetrieveServices(!retrieveServices);
  }

  useEffect(() => {
    async function fetchServices() {
      const retrievedServices = await ServiceService.retrieveServices({
        limit: 9999,
        search: search,
      });

      setServicesIsLoading(false);

      if (retrievedServices) {
        setServices(retrievedServices);
      }
    }

    fetchServices();
  }, [retrieveServices, search, setServices, setServicesIsLoading]);

  useEffect(() => {
    let userServicesArray = [];
    services.forEach((service) => {
      if (service.user_id === user.id) {
        userServicesArray.push(service);
      }
    });
    if (services.length > 0) {
      setUserServices(userServicesArray);
      setUserServicesHasUpdated(true);
    }
  }, [services]);

  console.log(userServices);

  // useEffect(() => {
  //   AnalyticsService.retrieveAnalytics();
  //   //
  //   const data = [1];
  //   setMetrics(data);
  //   setIsLoading(false);
  // }, [setMetrics, setIsLoading]);

  if (isLoading || !userServicesHasUpdated) {
    return <AppLoading />;
  }

  return <h1>Hi</h1>;
};

export default MyDashboard;
