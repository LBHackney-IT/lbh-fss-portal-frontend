import React, { useState, useEffect, useContext } from "react";
import { Redirect } from "@reach/router";
import UserContext from "../../../context/UserContext/UserContext";
import AddService from "../AddService/AddService";
import MyService from "../MyService/MyService";
import { checkIsInternalTeam } from "../../../utils/functions/functions";
import ServiceService from "../../../services/ServiceService/ServiceService";
import AppLoading from "../../../AppLoading";

const HandleMyService = () => {
  const user = useContext(UserContext)[0];
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
    if (!user.organisation) return;

    let userServicesArray = [];
    services.forEach((service) => {
      if (service.organisation_id === user.organisation.id) {
        userServicesArray.push(service);
      }
    });
    if (services.length > 0) {
      setUserServices(userServicesArray);
      setUserServicesHasUpdated(true);
    }
  }, [services]);

  const isInternalTeam = checkIsInternalTeam(user.roles);

  if (isInternalTeam) {
    return <Redirect to="/services" noThrow />;
  }
  if (!user.organisation) {
    return <Redirect to="/organisation" noThrow />;
  }

  if (servicesIsLoading || !userServicesHasUpdated) {
    return <AppLoading />;
  }

  return userServices.length > 0 ? (
    <MyService
      userServices={userServices}
      doRetrieveServices={doRetrieveServices}
      setSearch={setSearch}
    />
  ) : (
    <AddService doRetrieveServices={doRetrieveServices} />
  );
};

export default HandleMyService;
