import React, { useContext } from "react";
import AnalyticsTile from "../AnalyticsTile/AnalyticsTile";
import UserContext from "../../../context/UserContext/UserContext"
import AccessDenied from "../../Error/AccessDenied/AccessDenied"

const AnalyticsDashboard = () => {
  const fetchUserCount = async function () {
    return 255;
  };

  const fetchWeeklyApprovalCount = async function () {
    return 88;
  };

  const fetchWaitingApprovalCount = async function () {
    return 10;
  };

  const { roles } = useContext(UserContext)[0];

  const accessPermission = roles.includes('hackney_viewer') || roles.includes('hackney_admin')


  return accessPermission ? (
    <>
      <div>
        <AnalyticsTile
          label="Total number of users"
          fetchValue={fetchUserCount}
        />
        <AnalyticsTile
          label="Approvals this week"
          fetchValue={fetchWeeklyApprovalCount}
        />
        <AnalyticsTile
          label="Waiting approval"
          fetchValue={fetchWaitingApprovalCount}
        />
      </div>
    </>
  ) : (
      <AccessDenied />
    );
};

export default AnalyticsDashboard;
