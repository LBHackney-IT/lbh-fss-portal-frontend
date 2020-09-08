import React from "react";

function SVGIcon({ SVGComponent, width, height, top = ".075em" }) {
  return (
    <SVGComponent
      style={{
        width: width,
        height: height,
        top: top,
        position: "relative",
      }}
    />
  );
}

export default SVGIcon;
