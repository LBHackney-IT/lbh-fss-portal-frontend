import React from "react";
import styled from "styled-components";

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
