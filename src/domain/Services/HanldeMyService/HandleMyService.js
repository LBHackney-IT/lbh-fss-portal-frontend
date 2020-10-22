import React, { useState, useEffect, useContext } from "react";
import { Redirect } from "@reach/router";
import UserContext from "../../../context/UserContext/UserContext";
import AddService from "../AddService/AddService";
import ServiceService from "../../../services/ServiceService/ServiceService";
import { toast } from "react-toastify";
import MyService from "../MyService/MyService";
import useAllServiceFetch from "../../../hooks/useAllServiceFetch/useAllServiceFetch";
import { checkIsInternalTeam } from "../../../utils/functions/functions";

const HandleMyService = () => {
  const user = useContext(UserContext)[0];
  const { services, servicesIsLoading } = useAllServiceFetch();
  const [userServiceHasUpdated, setUserServiceHasUpdated] = useState(false);

  const [userServices, setUserServices] = useState([]);

  useEffect(() => {
    let userServicesArray = [];
    services.forEach((service) => {
      if (service.user_id === user.id) {
        userServicesArray.push(service);
      }
    });
    setUserServices(userServicesArray);
    setUserServiceHasUpdated(true);
  }, [services]);

  const isInternalTeam = checkIsInternalTeam(user.roles);

  if (servicesIsLoading || !userServiceHasUpdated) {
    return <span>Loading...</span>;
  }

  if (isInternalTeam) {
    return <Redirect to="/services" noThrow />;
  }

  return userServices.length > 0 ? (
    <MyService userServices={userServices} />
  ) : (
    <AddService />
  );
};

export default HandleMyService;
