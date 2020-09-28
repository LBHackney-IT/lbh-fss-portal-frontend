import React from "react";

function SVGIcon({ SVGComponent, width, height, top = ".075em", right = "0" }) {
  return (
    <SVGComponent
      style={{
        width: width,
        height: height,
        top: top,
        right: right,
        position: "relative",
      }}
    />
  );
}

export default SVGIcon;
