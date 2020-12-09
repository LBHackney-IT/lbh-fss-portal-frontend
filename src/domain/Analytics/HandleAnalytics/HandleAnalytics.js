import React, { useContext } from "react";
import UserContext from "../../../context/UserContext/UserContext";
import { checkIsInternalTeam } from "../../../utils/functions/functions";
import AccessDenied from "../../Error/AccessDenied/AccessDenied";
import AnalyticsDashboard from "../AnalyticsDashboard/AnalyticsDashboard";
import MyAnalytics from "../MyAnalytics/MyAnalytics";

const HandleAnalytics = () => {
  const user = useContext(UserContext)[0];

  const isInternalTeam = checkIsInternalTeam(user.roles);

  if (isInternalTeam) {
    return <AnalyticsDashboard />;
  } else if (user.organisation) {
    return <MyAnalytics />;
  } else {
    return <AccessDenied />;
  }
};

export default HandleAnalytics;
