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
import { red, grey } from "../../../settings/colors";
import { checkIsInternalTeam } from "../../../utils/functions/functions";
import AccessDenied from "../../Error/AccessDenied/AccessDenied";
import UserContext from "../../../context/UserContext/UserContext";
import ConfirmModal from "../../../components/ConfirmModal/ConfirmModal";

const TaxonomiesDashboard = () => {
  const [taxonomiesIsLoading, setTaxonomiesIsLoading] = useState(true);

  const [selectedTerm, setSelectedTerm] = useState({});

  const [serviceCategories, setServiceCategories] = useState([]);
  const [serviceDemographics, setServiceDemographics] = useState([]);

  const [removeIsLoading, setRemoveIsLoading] = useState(false);
  const [removeModalIsOpen, setRemoveModalIsOpen] = useState(false);

  const user = useContext(UserContext)[0];

  const isInternalTeam = checkIsInternalTeam(user.roles);

  useEffect(() => {
    async function fetchTaxonomies() {
      const taxonomies = await TaxonomiesService.retrieveTaxonomies();

      setTaxonomiesIsLoading(false);

      if (taxonomies) {
        const formattedServiceCategories = formatServiceCategories({
          serviceCategories: taxonomies.categories,
        });

        const formattedServiceDemographics = formatServiceDemographics({
          serviceDemographics: taxonomies.demographics,
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

  function toggleRemoveModal() {
    if (removeIsLoading) return;

    setRemoveModalIsOpen(!removeModalIsOpen);
  }

  async function doRemoveTaxonomyTerm() {
    setRemoveIsLoading(true);

    const deleteResponse = await TaxonomiesService.deleteTaxonomyTerm(
      selectedTerm.id
    );

    setRemoveIsLoading(false);

    if (!deleteResponse.error) {
      // Delete success
      toast.success(
        `Successfully removed '${selectedTerm.label}' taxonomy term.`
      );
    } else {
      // Check error code
      switch (deleteResponse.error) {
        default: {
          toast.error(
            `Failed to remove '${selectedTerm.label}' taxonomy term.`
          );
          break;
        }
        case 400: {
          toast.error(
            `You can't delete this category as there are services associated with it.`
          );
          break;
        }
      }
    }

    setRemoveModalIsOpen(false);
  }

  if (taxonomiesIsLoading || removeIsLoading) {
    return <AppLoading />;
  }

  return isInternalTeam ? (
    <>
      <h1>Taxonomies</h1>
      <RaisedCard>
        <TaxonomyPanel
          vocabularyName={"Categories"}
          taxonomy={serviceCategories}
          toggleRemoveModal={toggleRemoveModal}
          setSelectedTerm={setSelectedTerm}
        />
        <TaxonomyPanel
          vocabularyName={"Demographics"}
          taxonomy={serviceDemographics}
          toggleRemoveModal={toggleRemoveModal}
          setSelectedTerm={setSelectedTerm}
          titleStyle={{
            margin: "60px 0 0 0",
            borderTop: `1px solid ${grey[350]}`,
            paddingTop: "40px",
          }}
        />
      </RaisedCard>
      <ConfirmModal
        isOpen={removeModalIsOpen}
        toggleModal={toggleRemoveModal}
        confirmMessage={
          <>
            Are you sure you want to remove{" "}
            <strong>{selectedTerm.label}</strong>?
          </>
        }
        confirmButtonLabel={"Remove"}
        confirmButtonColor={red[400]}
        borderColor={red[400]}
        onConfirm={doRemoveTaxonomyTerm}
        includeReviewerMessage={false}
      />
    </>
  ) : (
    <AccessDenied />
  );
};

export default TaxonomiesDashboard;
