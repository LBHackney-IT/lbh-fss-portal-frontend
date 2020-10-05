import React, { useEffect, useContext, useState } from "react";
import UserContext from "../../../context/UserContext/UserContext";
import { checkIsInternalTeam } from "../../../utils/functions/functions";
import AccessDenied from "../../Error/AccessDenied/AccessDenied";
import styled from "styled-components";
import { breakpoint } from "../../../utils/breakpoint/breakpoint";
import { grey, red } from "../../../settings";
import Search from "../../../components/Search/Search";
import ServiceService from "../../../services/ServiceService/ServiceService";
import { ReactComponent as Trash } from "./icons/trash.svg";
import { toast } from "react-toastify";
import ConfirmModal from "../../../components/ConfirmModal/ConfirmModal";
import ServiceTable from "../ServiceTable/ServiceTable";

const StyledActionDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 20px;
  ${breakpoint("sm")`
    flex-direction: row;
    height: 80px;
    padding: 0 10px;
    justify-content: space-between;
    align-items: center;
  `};

  background-color: ${grey[500]};
`;

const ListServices = () => {
  const { roles } = useContext(UserContext)[0];

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [selectedService, setSelectedService] = useState({});

  const [search, setSearch] = useState(false);

  const [removeIsLoading, setRemoveIsLoading] = useState(false);
  const [removeModalIsOpen, setRemoveModalIsOpen] = useState(false);

  useEffect(() => {
    async function fetchServices() {
      let services = false;

      if (search) {
        services = await ServiceService.retrieveServices({
          limit: Infinity,
          search: search,
        });
      } else {
        services = await ServiceService.retrieveServices({
          limit: Infinity,
          search: "",
        });
      }

      setIsLoading(false);

      setData(services || []);
    }

    fetchServices();
  }, [search, setIsLoading, setData]);

  function toggleRemoveModal() {
    if (removeIsLoading) return;

    setRemoveModalIsOpen(!removeModalIsOpen);
  }

  async function doRemove() {
    if (removeIsLoading) return;

    setRemoveIsLoading(true);

    const serviceDeleted = await ServiceService.deleteService(
      selectedService.id
    );

    setRemoveIsLoading(false);

    if (serviceDeleted) {
      toast.success(`${selectedService.name} removed.`);
    } else {
      toast.error(`Unable to remove service.`);
    }

    setRemoveModalIsOpen(false);
  }

  const actions = [
    {
      title: "Remove",
      onClick: toggleRemoveModal,
      icon: Trash,
    },
  ];

  const isInternalTeam = checkIsInternalTeam(roles);

  if (isLoading) {
    return <span>Loading...</span>;
  }

  return isInternalTeam ? (
    <>
      <div>
        <StyledActionDiv>
          <Search setSearch={setSearch} />
        </StyledActionDiv>
      </div>
      <ServiceTable
        data={data}
        actions={actions}
        search={search}
        setSelectedService={setSelectedService}
      />
      <ConfirmModal
        isOpen={removeModalIsOpen}
        toggleModal={toggleRemoveModal}
        confirmMessage={
          <>
            Are you sure you want to remove{" "}
            <strong>{selectedService.name}</strong>?
          </>
        }
        confirmButtonLabel={"Remove"}
        confirmButtonColor={red[400]}
        borderColor={red[400]}
        onConfirm={doRemove}
        includeReviewerMessage={false}
      />
    </>
  ) : (
    <AccessDenied />
  );
};

export default ListServices;
