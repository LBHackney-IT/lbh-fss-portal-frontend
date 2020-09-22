import React, { useContext, useEffect, useState } from "react";
import UserContext from "../../../context/UserContext/UserContext";
import styled from "styled-components";
import EmptyOrganisation from "../EmptyOrganisation/EmptyOrganisation";
import { navigate, Redirect } from "@reach/router";
import OrganisationTable from "../OrganisationTable/OrganisationTable";
import useOrganisationFetch from "../../../hooks/useOrganisationFetch/useOrganisationFetch";
import { ReactComponent as RightArrow } from "./icons/right-arrow.svg";
import { ReactComponent as Trash } from "./icons/trash.svg";

const StyledFeedback = styled.div`
  background: rgba(190, 58, 52, 0.1);
  border: 1px solid #be3a34;
  box-sizing: border-box;
  border-radius: 3px;
  padding: 15px;
  width: 60%;
  margin: 10px 0 30px 0;
`;

const MyOrganisation = () => {
  const user = useContext(UserContext)[0];

  const {
    organisation,
    isLoading: organisationFetchIsLoading,
  } = useOrganisationFetch(user.organisation.id);

  const [organisationUser, setOrganisationUser] = useState({});

  useEffect(() => {
    let localOrganisationUser = {};
    const organisationId = user.organisation.id;
    const userName = user.name;
    localOrganisationUser[organisationId] = userName;

    setOrganisationUser(localOrganisationUser);
  }, [user, setOrganisationUser]);

  function doViewOrganisation() {
    navigate(`/organisations/${user.organisation.id}/edit`);
  }
  function doUpdateOrganisation() {
    navigate(`/organisations/${user.organisation.id}/edit`);
  }
  function doRemove() {
    alert("remove organisation");
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
        onClick: doRemove,
        icon: Trash,
      },
    ];
  }

  const isInternalTeam =
    user.roles.includes("viewer") || user.roles.includes("admin");

  if (isInternalTeam) {
    return <Redirect to="/organisations" noThrow />;
  }

  if (user.organisation) {
    return organisationFetchIsLoading ? (
      <div>Loading...</div>
    ) : (
      <>
        <OrganisationTable
          data={[organisation]}
          organisationUser={organisationUser}
          showPagination={false}
          actions={actions}
          actionWidth={"210px"}
        />
        {organisation.status === "rejected" && organisation.reviewerMessage ? (
          <StyledFeedback>{organisation.reviewerMessage}</StyledFeedback>
        ) : null}
      </>
    );
  } else {
    return <EmptyOrganisation />;
  }
};

export default MyOrganisation;
