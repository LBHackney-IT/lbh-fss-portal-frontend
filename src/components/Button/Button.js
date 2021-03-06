import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { neutral, green } from "../../settings";
import { darken } from "polished";

const StyledButton = styled.button`
  display: block;
  margin: ${(props) => props.margin || "0 0 30px 0"};
  color: ${(props) => props.color || neutral[100]};
  background-color: ${(props) => props.backgroundColor || green[400]};
  border: ${(props) => props.border || "none"};
  padding: ${(props) => props.padding || "13px 57px"};
  font-size: 19px;
  border-bottom: 2px solid black;
  cursor: pointer;
  border-radius: 3px;
  &:hover {
    background-color: ${(props) =>
      props.backgroundColor
        ? darken(0.1, props.backgroundColor)
        : darken(0.1, green[400])};
  }
`;

const Button = ({
  type,
  label,
  disabled,
  onClick = () => {},
  className,
  color,
  backgroundColor,
  border,
  margin,
  padding,
}) => {
  return (
    <>
      <StyledButton
        type={type}
        disabled={disabled}
        onClick={onClick}
        className={className}
        color={color}
        backgroundColor={backgroundColor}
        border={border}
        margin={margin}
        padding={padding}
      >
        {label}
      </StyledButton>
    </>
  );
};

Button.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
};

export default Button;
