import React, { useEffect, useState } from "react";
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

function giveUserFeedback({ term, updateStatus, action }) {
  if (updateStatus) {
    toast.success(
      `Successfully ${
        action === "add" ? "added" : "removed"
      } '${term}' taxonomy term.`
    );
  } else {
    toast.error(
      `Failed to ${
        action === "add" ? "add" : "remove"
      } '${term}' taxonomy term.`
    );
  }
}

function giveUserFeedbackAfterRemovingTerm(term, updatedTerm) {
  if (updatedTerm) {
    toast.success(`Successfully added '${term}' taxonomy term.`);
  } else {
    toast.error(`Failed to add '${term}' taxonomy term.`);
  }
}

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

  function doAddDemographic({ term }) {
    setServiceDemographicsIsLoading(true);

    // make call to POST /taxonomies
    // const termSuccessfullyAdded = false;
    const termSuccessfullyAdded = [];

    setServiceDemographicsIsLoading(false);

    giveUserFeedback({
      term,
      updateStatus: termSuccessfullyAdded,
      action: "add",
    });
  }

  function doRemoveDemographic(demographic) {
    setServiceDemographicsIsLoading(true);

    // make call to DELETE /taxonomies/{id}
    // const termSuccessfullyRemoved = false;
    const termSuccessfullyRemoved = [];

    setServiceDemographicsIsLoading(false);

    giveUserFeedback({
      term: demographic.label,
      updateStatus: termSuccessfullyRemoved,
      action: "remove",
    });
  }

  function doAddCategory({ term }) {
    setServiceCategoriesIsLoading(true);

    // make call to POST /taxonomies
    // const termSuccessfullyAdded = false;
    const termSuccessfullyAdded = [];

    setServiceCategoriesIsLoading(false);

    giveUserFeedback({
      term,
      updateStatus: termSuccessfullyAdded,
      action: "add",
    });
  }

  function doRemoveCategory(category) {
    setServiceCategoriesIsLoading(true);

    // make call to DELETE /taxonomies/{id}
    // demographic.id
    const termSuccessfullyRemoved = [];

    setServiceCategoriesIsLoading(false);

    giveUserFeedback({
      term: category.label,
      updateStatus: termSuccessfullyRemoved,
      action: "remove",
    });
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
