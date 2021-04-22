import React from "react";
import Loader from "react-loader-spinner";
import { green } from "./settings/colors";

const AppLoading = ({ height = 200, margin = "10px auto" }) => {
  return (
    <div
      style={{
        display: "flex",
      }}
    >
      <div style={{ margin: margin }}>
        <Loader type="Oval" color={green[300]} height={height} width={100} />
      </div>
    </div>
  );
};

export default AppLoading;
