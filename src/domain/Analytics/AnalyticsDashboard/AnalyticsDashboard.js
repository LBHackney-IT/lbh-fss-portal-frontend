import React from "react";
import AnalyticsTile from "../AnalyticsTile/AnalyticsTile";

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

  return (
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
  );
};

export default AnalyticsDashboard;
