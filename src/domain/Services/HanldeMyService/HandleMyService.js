import React, { useState, useEffect, useContext } from "react";
import { Redirect } from "@reach/router";
import UserContext from "../../../context/UserContext/UserContext";
import AddService from "../AddService/AddService";
import ServiceService from "../../../services/ServiceService/ServiceService";
import { toast } from "react-toastify";
import MyService from "../MyService/MyService";
import useAllServiceFetch from "../../../hooks/useAllServiceFetch/useAllServiceFetch";

const HandleMyService = () => {
  const user = useContext(UserContext)[0];
  const { services, servicesIsLoading } = useAllServiceFetch();

  const [userServices, setUserServices] = useState([]);

  useEffect(() => {
    const userServices = [];
    services.forEach((service) => {
      if (service.user_id === user.id) {
        userServices.push(service);
      }
    });
    setUserServices(userServices);
  }, [services]);

  const isInternalTeam =
    user.roles.includes("viewer") || user.roles.includes("admin");

  if (servicesIsLoading) {
    return <span>Loading...</span>;
  }

  if (isInternalTeam) {
    return <Redirect to="/services" noThrow />;
  }

  return userServices ? (
    <MyService userServices={userServices} />
  ) : (
    <AddService />
  );
};

export default HandleMyService;
