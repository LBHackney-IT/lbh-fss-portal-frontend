import React, { useContext } from "react";
import AnalyticsTile from "../AnalyticsTile/AnalyticsTile";
import UserContext from "../../../context/UserContext/UserContext"
import AccessDenied from "../../Error/AccessDenied/AccessDenied"

const AnalyticsDashboard = () => {
  const fetchServiceCount = async function () {
    return 255;
  };

  const fetchServiceApprovalCount = async function () {
    return 88;
  };

  const fetchServiceApprovedCount = async function () {
    return 10;
  };

  const fetchServiceWaitingApprovalCount = async function () {
    return 6;
  }

  const { roles } = useContext(UserContext)[0];

  const accessPermission = roles.includes('viewer') || roles.includes('admin')


  return accessPermission ? (
    <>
      <div>
        <AnalyticsTile
          label="Total number of services"
          fetchValue={fetchServiceCount}
          color={'green'}
        />
        <AnalyticsTile
          label="Number of services submitted"
          fetchValue={fetchServiceApprovalCount}
          color={'green'}
        />
        <AnalyticsTile
          label="Number of services approved"
          fetchValue={fetchServiceApprovedCount}
          color={'green'}
        />
      </div>
      <div>
        <AnalyticsTile
          label="Currently number of services waiting approval"
          fetchValue={fetchServiceWaitingApprovalCount}
          color={'yellow'}
        />
      </div>
    </>
  ) : (
      <AccessDenied />
    );
};

export default AnalyticsDashboard;
