import React, { useEffect, useState } from "react";
import ServiceDemographicsTaxonomy from "../ServiceDemographicsTaxonomy/ServiceDemographicsTaxonomy";
import ServiceCategoriesTaxonomy from "../ServiceCategoriesTaxonomy/ServiceCategoriesTaxonomy";
import AppLoading from "../../../AppLoading";
import TaxonomiesService from "../../../services/TaxonomiesService/TaxonomiesService";
import {
  formatServiceCategories,
  formatServiceDemographics,
} from "../../../utils/functions/serviceFunctions";
import { toast } from "react-toastify";
import { navigate } from "@reach/router";
import RaisedCard from "../../../components/RaisedCard/RaisedCard";
import TaxonomyPanel from "../TaxonomyPanel/TaxonomyPanel";
import { grey } from "../../../settings/colors";

const TaxonomiesDashboard = () => {
  const [taxonomiesIsLoading, setTaxonomiesIsLoading] = useState(true);
  const [serviceCategoriesIsLoading, setServiceCategoriesIsLoading] = useState(
    false
  );
  const [
    serviceDemographicsIsLoading,
    setServiceDemographicsIsLoading,
  ] = useState(false);

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

        const formattedServiceDemographics = formatServiceDemographics({
          serviceDemographics: taxonomies.serviceDemographics,
          addEveryoneTerm: false,
        });

        setServiceCategories(formattedServiceCategories);
        setServiceDemographics(formattedServiceDemographics);
      } else {
        toast.error("Could not retrieve taxonomies.");
        navigate("/service");
      }
    }

    fetchTaxonomies();
  }, [setServiceCategories, setServiceDemographics]);

  function doAddDemographic(values) {
    setServiceDemographicsIsLoading(true);

    // make call to POST /taxonomies
    // values.demographic
    const updatedDemographics = [];

    setServiceDemographicsIsLoading(false);

    if (updatedDemographics) {
      toast.success(
        `Successfully added '${values.demographic}' taxonomy term.`
      );
    } else {
      toast.error(`Failed to add '${values.demographic}' taxonomy term.`);
    }
  }

  function doRemoveDemographic(demographic) {
    setServiceDemographicsIsLoading(true);

    // make call to DELETE /taxonomies/{id}
    // const demographicRemoved = false;
    const demographicRemoved = [];

    setServiceDemographicsIsLoading(false);

    if (demographicRemoved) {
      toast.success(
        `Successfully removed '${demographic.label}' taxonomy term.`
      );
    } else {
      toast.error(`Failed to remove '${demographic.label}' taxonomy term.`);
    }
  }

  function doAddCategory(values) {
    setServiceCategoriesIsLoading(true);

    // make call to POST /taxonomies
    // values.demographic
    const updatedCategory = [];

    setServiceCategoriesIsLoading(false);

    if (updatedCategory) {
      toast.success(`Successfully added '${values.category}' taxonomy term.`);
    } else {
      toast.error(`Failed to add '${values.category}' taxonomy term.`);
    }
  }

  function doRemoveCategory(category) {
    setServiceCategoriesIsLoading(true);

    // make call to DELETE /taxonomies/{id}
    // demographic.id
    const categoryRemoved = [];

    setServiceCategoriesIsLoading(false);

    if (categoryRemoved) {
      toast.success(`Successfully removed '${category.label}' taxonomy term.`);
    } else {
      toast.error(`Failed to remove '${category.label}' taxonomy term.`);
    }
  }

  if (taxonomiesIsLoading) {
    return <AppLoading />;
  }

  return (
    <>
      <h1>Taxonomies</h1>
      <RaisedCard>
        <TaxonomyPanel
          taxonomyName={"Categories"}
          taxonomyTerms={serviceCategories}
          isLoading={serviceCategoriesIsLoading}
          addTerm={doAddCategory}
          removeTerm={doRemoveCategory}
        />
        <TaxonomyPanel
          taxonomyName={"Demographics"}
          taxonomyTerms={serviceDemographics}
          isLoading={serviceDemographicsIsLoading}
          addTerm={doAddDemographic}
          removeTerm={doRemoveDemographic}
          titleStyle={{
            margin: "60px 0 0 0",
            borderTop: `1px solid ${grey[350]}`,
            paddingTop: "40px",
          }}
        />
      </RaisedCard>
    </>
  );
};

export default TaxonomiesDashboard;
