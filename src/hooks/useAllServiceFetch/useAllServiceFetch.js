import { useState, useEffect } from "react";
import ServiceService from "../../services/ServiceService/ServiceService";
import { toast } from "react-toastify";

function useAllServiceFetch(paramsObject = { limit: 9999, search: "" }) {
  const [services, setServices] = useState([]);
  const [servicesIsLoading, setServicesIsLoading] = useState(true);

  useEffect(() => {
    async function fetchServices() {
      const retrievedServices = await ServiceService.retrieveServices(
        paramsObject
      );

      setServicesIsLoading(false);

      if (retrievedServices) {
        setServices(retrievedServices);
      }
    }

    fetchServices();
  }, [setServices, setServicesIsLoading]);

  return {
    services,
    servicesIsLoading,
  };
}

export default useAllServiceFetch;
