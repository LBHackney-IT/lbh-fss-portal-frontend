import React, { useContext, useEffect, useState } from "react";
import UserContext from "../../../context/UserContext/UserContext";
import styled from "styled-components";
import EmptyOrganisation from "../EmptyOrganisation/EmptyOrganisation";
import { navigate } from "@reach/router";
import OrganisationTable from "../OrganisationTable/OrganisationTable";
import useOrganisationFetch from "../../../hooks/useOrganisationFetch/useOrganisationFetch";
import { ReactComponent as RightArrow } from "./icons/right-arrow.svg";
import { ReactComponent as Trash } from "./icons/trash.svg";
import OrganisationService from "../../../services/OrganisationService/OrganisationService";
import { toast } from "react-toastify";
import ConfirmModal from "../../../components/ConfirmModal/ConfirmModal";
import { red, green, yellow } from "../../../settings";
import AppLoading from "../../../AppLoading";
import AuthenticationService from "../../../services/AuthenticationService/AuthenticationService";

const StyledFeedback = styled.div`
  box-sizing: border-box;
  border-radius: 3px;
  padding: 15px;
  width: 60%;
  margin: 10px 0 30px 0;
`;

const StyledRejectedFeedback = styled(StyledFeedback)`
  background: ${red[100]};
  border: 1px solid #be3a34;
`;

const StyledReverificationFeedback = styled(StyledFeedback)`
  background: ${yellow[100]};
  border: 1px solid ${yellow[500]};
`;

const StyledApprovedFeedback = styled(StyledFeedback)`
  background: ${green[100]};
  border: 1px solid ${green[400]};
`;

async function fetchMe(setUser, setUserIsLoading) {
  setUserIsLoading(true);

  const user = await AuthenticationService.me();

  setUserIsLoading(false);

  setUser(user);
}

const MyOrganisation = () => {
  const [user, setUser] = useContext(UserContext);
  const [userIsLoading, setUserIsLoading] = useState(false);

  const [selectedOrganisation, setSelectedOrganisation] = useState({});

  const [removeIsLoading, setRemoveIsLoading] = useState(false);
  const [removeModalIsOpen, setRemoveModalIsOpen] = useState(false);

  console.log("3. MyOrganisation");
  const {
    organisation,
    isLoading: organisationFetchIsLoading,
  } = useOrganisationFetch(user.organisation.id);

  const [organisationUser, setOrganisationUser] = useState({});

  useEffect(() => {
    let localOrganisationUser = {};
    const organisationId = user.organisation.id;
    const userName = user.name;
    const userId = user.id;
    localOrganisationUser[organisationId] = {
      name: userName,
      id: userId,
    };

    setOrganisationUser(localOrganisationUser);
  }, [user, setOrganisationUser]);

  function toggleRemoveModal() {
    if (removeIsLoading) return;

    setRemoveModalIsOpen(!removeModalIsOpen);
  }

  function doViewOrganisation() {
    navigate(`/organisations/${user.organisation.id}/edit`);
  }

  async function doRemove() {
    if (removeIsLoading) return;

    setRemoveIsLoading(true);

    const organisationDeleted = await OrganisationService.deleteOrganisation(
      selectedOrganisation.id
    );

    setRemoveIsLoading(false);

    if (organisationDeleted) {
      fetchMe(setUser, setUserIsLoading);
      toast.success(`${selectedOrganisation.name} removed.`);
    } else {
      toast.error(`Unable to remove organisation.`);
    }

    setRemoveModalIsOpen(false);
  }

  let actions = [];

  if (!organisationFetchIsLoading) {
    actions = [
      {
        title:
          organisation.status === "rejected"
            ? "Update organisation"
            : "View organisation",
        onClick: doViewOrganisation,
        icon: RightArrow,
      },
      {
        title: "Remove",
        onClick: toggleRemoveModal,
        icon: Trash,
      },
    ];
  }

  if (organisationFetchIsLoading || removeIsLoading || userIsLoading) {
    return <AppLoading />;
  }

  return (
    <>
      <OrganisationTable
        data={[organisation]}
        organisationUser={organisationUser}
        showPagination={false}
        setSelectedOrganisation={setSelectedOrganisation}
        actions={actions}
        actionWidth={"210px"}
      />
      {organisation.status === "rejected" && organisation.reviewer_message ? (
        <StyledRejectedFeedback>
          {organisation.reviewer_message}
        </StyledRejectedFeedback>
      ) : null}
      {organisation.status === "awaiting reverification" ? (
        <StyledReverificationFeedback>
          It has been 12 months since you last verified your organisation
          information. Please re-verify your organisation by reviewing your
          organisation information and re-submitting the form.
        </StyledReverificationFeedback>
      ) : null}
      {organisation.status === "published" && organisation.reviewer_message ? (
        <StyledApprovedFeedback>
          {organisation.reviewer_message}
        </StyledApprovedFeedback>
      ) : null}
      <ConfirmModal
        isOpen={removeModalIsOpen}
        toggleModal={toggleRemoveModal}
        confirmMessage={
          <>
            Are you sure you want to remove{" "}
            <strong>{selectedOrganisation.name}</strong>?
          </>
        }
        confirmButtonLabel={"Remove"}
        confirmButtonColor={red[400]}
        borderColor={red[400]}
        onConfirm={doRemove}
        includeReviewerMessage={false}
      />
    </>
  );
};

export default MyOrganisation;
