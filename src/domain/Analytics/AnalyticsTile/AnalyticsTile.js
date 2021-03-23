import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { breakpoint } from "../../../utils/breakpoint/breakpoint";
import { green, yellow, red } from "../../../settings";

const StyledTileContainer = styled.div`
  position: relative;
  background-color: ${(props) =>
    (props.color === "yellow") ? yellow[100] : (props.color === "green") ? green[100] : red[100]};
  border: 1px solid
    ${(props) => ((props.color === "yellow") ? yellow[500] : (props.color === "green") ? green[400] : red[100])};
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 20px;
  ${breakpoint("sm")`
    width: ${(props) => (props.col === "col-4" ? "calc(50% - 40px)" : (props.col === "col-3") ? "calc(33.333% - 40px)" : "calc(100% - 40px)")};
    height: 175px;
    margin: 20px;
  `}
  ${breakpoint("md")`
    height: 200px;
    width: ${(props) => (props.col === "col-4" ? "calc(25% - 15px)" : (props.col === "col-3") ? "calc(33.333% - 20px)" : "100%")};
    margin: 0;
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

const AnalyticsTile = ({ label, shortLabel, value, color, col}) => {
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
