import { useState, useEffect } from "react";
import OrganisationService from "../../services/OrganisationService/OrganisationService";
import { toast } from "react-toastify";

function useAllOrganisationFetch(paramsObject = { limit: 9999, search: "" }) {
  const [organisations, setOrganisations] = useState([]);
  const [organisationsIsLoading, setOrganisationsIsLoading] = useState(true);

  useEffect(() => {
    async function fetchOrganisations() {
      const retrievedOrganisations = await OrganisationService.retrieveOrganisations(
        paramsObject
      );

      setOrganisationsIsLoading(false);

      if (retrievedOrganisations) {
        setOrganisations(retrievedOrganisations);
      } else {
        toast.error("Unable to find organisations");
      }
    }

    fetchOrganisations();
  }, [setOrganisations, setOrganisationsIsLoading]);

  return {
    organisations,
    organisationsIsLoading,
  };
}

export default useAllOrganisationFetch;
