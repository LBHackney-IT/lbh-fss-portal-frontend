import React from "react";
import { Link } from "@reach/router";
import styled from "styled-components";
import { green, limeGreen, orange, yellow } from "../../settings";

const StyledLink = styled(Link)``;

const NavLink = (props) => {
  return (
    <StyledLink
      data-testid="navigation"
      {...props}
      getProps={({ isPartiallyCurrent }) => {
        return {
          style: {
            fontWeight: isPartiallyCurrent ? "bold" : "normal",
            color: isPartiallyCurrent ? "black" : "white",
            backgroundColor: isPartiallyCurrent ? yellow[400] : green[300],
            textAlign: "center",
            minWidth: "125px",
            padding: "10px",
            borderRadius: "3px 3px 0px 0px",
            borderBottom: `3px solid ${
              isPartiallyCurrent ? orange[400] : limeGreen[400]
            }`,
          },
        };
      }}
    />
  );
};

export default NavLink;
