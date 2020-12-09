import React, { useContext } from "react";
import UserContext from "../../../context/UserContext/UserContext";
import { checkIsInternalTeam } from "../../../utils/functions/functions";
import AnalyticsDashboard from "../AnalyticsDashboard/AnalyticsDashboard";
import MyAnalytics from "../MyAnalytics/MyAnalytics";

const HandleAnalytics = () => {
  const user = useContext(UserContext)[0];

  const isInternalTeam = checkIsInternalTeam(user.roles);

  console.log(isInternalTeam);

  if (isInternalTeam) {
    return <AnalyticsDashboard />;
  } else {
    return <MyAnalytics />;
  }
};

export default HandleAnalytics;
