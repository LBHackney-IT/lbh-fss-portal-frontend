import React, { useContext, useEffect, useState } from "react";
import UserContext from "../../../context/UserContext/UserContext";
import EmptyOrganisation from "../EmptyOrganisation/EmptyOrganisation";
import AccessDenied from "../../Error/AccessDenied/AccessDenied";
import EditOrganisation from "../EditOrganisation/EditOrganisation";
import { navigate, Redirect } from "@reach/router";
import OrganisationTable from "../OrganisationTable/OrganisationTable";
import useOrganisationFetch from "../../../hooks/useOrganisationFetch/useOrganisationFetch";
import { ReactComponent as ApproveCircle } from "./icons/approve-circle.svg";
import { ReactComponent as RightArrow } from "./icons/right-arrow.svg";
import { ReactComponent as Trash } from "./icons/trash.svg";

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
  function doSubmitForApproval() {
    alert("submit for approval");
  }
  function doRemove() {
    alert("remove organisation");
  }

  const actions = [
    {
      title: "View organisation",
      onClick: doViewOrganisation,
      icon: RightArrow,
    },
    {
      title: "Submit for approval",
      onClick: doSubmitForApproval,
      icon: ApproveCircle,
    },
    {
      title: "Remove",
      onClick: doRemove,
      icon: Trash,
    },
  ];

  const isInternalTeam =
    user.roles.includes("viewer") || user.roles.includes("admin");

  if (isInternalTeam) {
    return <Redirect to="/organisations" noThrow />;
  }

  if (user.organisation) {
    return organisationFetchIsLoading ? (
      <div>Loading...</div>
    ) : (
      <OrganisationTable
        data={[organisation]}
        organisationUser={organisationUser}
        showPagination={false}
        actions={actions}
        actionWidth={"200px"}
      />
    );
  } else {
    return <EmptyOrganisation />;
  }
};

export default MyOrganisation;
