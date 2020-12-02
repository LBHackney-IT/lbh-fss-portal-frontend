import React, { useContext, useEffect, useState } from "react";
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
import { checkIsInternalTeam } from "../../../utils/functions/functions";
import AccessDenied from "../../Error/AccessDenied/AccessDenied";
import UserContext from "../../../context/UserContext/UserContext";

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

  const user = useContext(UserContext)[0];

  const isInternalTeam = checkIsInternalTeam(user.roles);

  useEffect(() => {
    async function fetchTaxonomies() {
      const taxonomies = await TaxonomiesService.retrieveTaxonomies();

      setTaxonomiesIsLoading(false);

      if (taxonomies) {
        const formattedServiceCategories = formatServiceCategories({
          serviceCategories: taxonomies.serviceCategories,
        });

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

  function doRemoveCategory(term) {
    setServiceDemographicsIsLoading(true);

    const termSuccessfullyRemoved = TaxonomiesService.deleteTaxonomyTerm(
      term.id
    );

    setServiceDemographicsIsLoading(false);

    if (termSuccessfullyRemoved) {
      toast.success(`Successfully removed '${term.label}' taxonomy term.`);
    } else {
      toast.error(`Failed to remove '${term.label}' taxonomy term.`);
    }
  }

  function doRemoveDemographic(term) {
    setServiceDemographicsIsLoading(true);

    const termSuccessfullyRemoved = TaxonomiesService.deleteTaxonomyTerm(
      term.id
    );

    setServiceDemographicsIsLoading(false);

    if (termSuccessfullyRemoved) {
      toast.success(`Successfully removed '${term.label}' taxonomy term.`);
    } else {
      toast.error(`Failed to remove '${term.label}' taxonomy term.`);
    }
  }

  if (taxonomiesIsLoading) {
    return <AppLoading />;
  }

  return isInternalTeam ? (
    <>
      <h1>Taxonomies</h1>
      <RaisedCard>
        <TaxonomyPanel
          vocabularyName={"Categories"}
          taxonomy={serviceCategories}
          isLoading={serviceCategoriesIsLoading}
          removeTerm={doRemoveCategory}
        />
        <TaxonomyPanel
          vocabularyName={"Demographics"}
          taxonomy={serviceDemographics}
          isLoading={serviceDemographicsIsLoading}
          removeTerm={doRemoveDemographic}
          titleStyle={{
            margin: "60px 0 0 0",
            borderTop: `1px solid ${grey[350]}`,
            paddingTop: "40px",
          }}
        />
      </RaisedCard>
    </>
  ) : (
    <AccessDenied />
  );
};

export default TaxonomiesDashboard;
