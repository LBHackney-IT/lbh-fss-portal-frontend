import { useState, useEffect } from "react";
import ServiceService from "../../services/ServiceService/ServiceService";
import { toast } from "react-toastify";
import { navigate } from "@reach/router";

function useServiceFetch(serviceId) {
  const [service, setService] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchService() {
      const newService = await ServiceService.getService(serviceId);

      if (newService) {
        setService(newService);

        setIsLoading(false);
      } else {
        toast.error("Unable to find service.");

        navigate("/services");
      }
    }

    fetchService();
  }, [serviceId, setService, setIsLoading]);

  return {
    service,
    isLoading,
  };
}

export default useServiceFetch;
