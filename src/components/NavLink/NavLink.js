import React from "react";
import { Link } from "@reach/router";
import styled from "styled-components";

const StyledLink = styled(Link)`
  margin-left: 27px;
`;

const NavLink = (props) => {
  return (
    <StyledLink
      {...props}
      getProps={({ isCurrent }) => {
        return {
          style: {
            fontWeight: isCurrent ? "bold" : "normal",
          },
        };
      }}
    />
  );
};

export default NavLink;
