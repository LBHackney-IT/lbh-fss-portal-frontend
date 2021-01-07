import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { breakpoint } from "../../../utils/breakpoint/breakpoint";
import { green, yellow } from "../../../settings";

const StyledTileContainer = styled.div`
  position: relative;
  background-color: ${(props) =>
    props.color === "yellow" ? yellow[100] : green[100]};
  border: 1px solid
    ${(props) => (props.color === "yellow" ? yellow[500] : green[400])};
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 20px;
  ${breakpoint("sm")`
    width: ${(props) => (props.col === "col-4" ? "calc(25% - 15px)" : "30%")};
    height: 175px;
    margin: 0;
  `}
  ${breakpoint("md")`
    height: 200px;
  `}
`;

const StyledLabel = styled.div`
  width: 70%;
  text-align: center;
  font-size: 20px;
`;

const StyledShortLabel = styled.span`
  position: absolute;
  top: 10px;
  left: 10px;
  font-size: 14px;
  font-weight: bold;
`;

const StyledValue = styled.div`
  width: 70%;
  text-align: center;
  margin-top: 15px;
  font-size: 40px;
  font-weight: bold;
`;

const AnalyticsTile = ({ label, shortLabel, value, color, col }) => {
  return (
    <StyledTileContainer color={color} col={col}>
      <StyledShortLabel>{shortLabel}</StyledShortLabel>
      <StyledLabel>{label}</StyledLabel>
      <StyledValue>{value}</StyledValue>
    </StyledTileContainer>
  );
};

AnalyticsTile.propTypes = {
  shortLabel: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.number,
  color: PropTypes.string,
};

export default AnalyticsTile;
