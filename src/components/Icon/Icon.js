import React from "react";
import styled from "styled-components";
import { green } from "../../settings";
import { darken } from "polished";
import arrowLeft from "../../domain/Users/UserPagination/icons/arrow-left.svg";

const StyledIcon = styled.span`
  background-repeat: no-repeat;
  display: inline-block;
  text-indent: -999999px;
  background-size: contain;
  width: 15px;
  height: 15px;
`;

function Icon({ imageLocation }) {
  return (
    <StyledIcon
      style={{ backgroundImage: `url(${imageLocation})`, color: "grey" }}
    />
  );
}

export default Icon;
