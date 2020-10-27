import React, { useState, useEffect, useContext } from "react";
import { Redirect } from "@reach/router";
import UserContext from "../../../context/UserContext/UserContext";
import AddService from "../AddService/AddService";
import MyService from "../MyService/MyService";
import useAllServiceFetch from "../../../hooks/useAllServiceFetch/useAllServiceFetch";
import { checkIsInternalTeam } from "../../../utils/functions/functions";

const HandleMyService = () => {
  const user = useContext(UserContext)[0];
  const { services, servicesIsLoading } = useAllServiceFetch();

  const [userServices, setUserServices] = useState([]);
  const [userServicesHasUpdated, setUserServicesHasUpdated] = useState(false);

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

  const isInternalTeam = checkIsInternalTeam(user.roles);

  if (servicesIsLoading || !userServicesHasUpdated) {
    return <span>Loading...</span>;
  }

  if (isInternalTeam) {
    return <Redirect to="/services" noThrow />;
  }

  return userServices.length > 0 ? (
    <MyService userServices={userServices} setUserServices={setUserServices} />
  ) : (
    <AddService />
  );
};

export default HandleMyService;
