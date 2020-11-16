import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { grey } from "../../settings";

const StyledHelp = styled.p`
  color: ${grey[400]};
  margin: 5px 0 20px 0;
`;

const FormHelpText = ({ helpText, styledHelp }) => {
  return <StyledHelp styledHelp={styledHelp}>{helpText}</StyledHelp>;
};

FormHelpText.propTypes = {
  helpText: PropTypes.string,
  styledHelp: PropTypes.object,
};

export default FormHelpText;
