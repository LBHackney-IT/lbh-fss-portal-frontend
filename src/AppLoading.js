import React from "react";
import Loader from "react-loader-spinner";
import { green } from "./settings/colors";

const AppLoading = ({ height = 200 }) => {
  return (
    <div
      style={{
        display: "flex",
      }}
    >
      <div style={{ margin: "10px auto" }}>
        <Loader
          type="Oval"
          color={green[300]}
          height={height}
          width={100}
          timeout={3000}
        />
      </div>
    </div>
  );
};

export default AppLoading;
