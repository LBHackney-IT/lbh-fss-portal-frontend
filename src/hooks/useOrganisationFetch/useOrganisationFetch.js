import { useState, useEffect } from "react";
import OrganisationService from "../../services/OrganisationService/OrganisationService";
import { toast } from "react-toastify";
import { navigate } from "@reach/router";

function useOrganisationFetch(organisationId) {
  const [organisation, setOrganisation] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchService() {
      if (typeof organisationId === "undefined") return;
      const newOrganisation = await OrganisationService.getOrganisation(
        organisationId
      );

      if (newOrganisation) {
        setOrganisation(newOrganisation);

        setIsLoading(false);
      } else {
        toast.error("Unable to find organisation.");

        navigate("/services");
      }
    }

    fetchService();
  }, [organisationId, setOrganisation, setIsLoading]);

  return {
    organisation,
    isLoading,
  };
}

export default useOrganisationFetch;
