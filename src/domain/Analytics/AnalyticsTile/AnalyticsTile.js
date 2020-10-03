import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { breakpoint } from "../../../utils/breakpoint/breakpoint";
import { green, yellow } from "../../../settings";

// console.log(rgba(32, 144, 119, 0.1));

const StyledTileContainer = styled.div`
  background-color: ${(props) =>
    props.color === "yellow" ? yellow[100] : green[100]};
  border: 1px solid
    ${(props) => (props.color === "yellow" ? yellow[500] : green[400])};
  height: 200px;
  width: 30%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledLabel = styled.div`
  width: 70%;
  text-align: center;
  font-size: 20px;
`;

const StyledValue = styled.div`
  width: 70%;
  text-align: center;
  margin-top: 15px;
  font-size: 40px;
  font-weight: bold;
`;

const AnalyticsTile = ({ label, value, color }) => {
  return (
    <StyledTileContainer color={color}>
      <StyledLabel>{label}</StyledLabel>
      <StyledValue>{value}</StyledValue>
    </StyledTileContainer>
  );
};

AnalyticsTile.propTypes = {
  label: PropTypes.string,
  value: PropTypes.number,
  color: PropTypes.string,
};

export default AnalyticsTile;
