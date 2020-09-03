import React from "react";
import { Link } from "@reach/router";

const NavLink = (props) => {
  return (
    <Link
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
