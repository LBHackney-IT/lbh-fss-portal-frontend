import React, { useEffect, useState } from "react";
import ServiceDemographicsTaxonomy from "../ServiceDemographicsTaxonomy/ServiceDemographicsTaxonomy";
import ServiceCategoriesTaxonomy from "../ServiceCategoriesTaxonomy/ServiceCategoriesTaxonomy";
import { useForm } from "react-hook-form";
import AppLoading from "../../../AppLoading";
import TaxonomiesService from "../../../services/TaxonomiesService/TaxonomiesService";
import {
  formatServiceCategories,
  formatServiceDemographics,
} from "../../../utils/functions/serviceFunctions";
import { toast } from "react-toastify";
import { navigate } from "@reach/router";

const TaxonomiesDashboard = () => {

  const [taxonomiesIsLoading, setTaxonomiesIsLoading] = useState(true);
  const [serviceCategories, setServiceCategories] = useState([]);
  const [serviceDemographics, setServiceDemographics] = useState([]);

  useEffect(() => {
    async function fetchTaxonomies() {
      const taxonomies = await TaxonomiesService.retrieveTaxonomies();

      setTaxonomiesIsLoading(false);

      if (taxonomies) {
        const formattedServiceCategories = formatServiceCategories(
          taxonomies.serviceCategories
        );

        const formattedServiceDemographics = formatServiceDemographics(
          taxonomies.serviceDemographics
        );

        setServiceCategories(formattedServiceCategories);
        setServiceDemographics(formattedServiceDemographics);
      } else {
        toast.error("Could not retrieve taxonomies.");
        navigate("/service");
      }
    }

    fetchTaxonomies();
  }, [setServiceCategories, setServiceDemographics]);

  if (taxonomiesIsLoading) {
    return <AppLoading />;
  }

  return (
    <>
      <ServiceCategoriesTaxonomy serviceCategories={serviceCategories} />
      <ServiceDemographicsTaxonomy serviceDemographics={serviceDemographics} />
    </>
  );
};

export default TaxonomiesDashboard;
