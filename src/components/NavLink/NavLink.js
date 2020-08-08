import React from "react";
import { Link } from "@reach/router";

const NavLink = (props) => {
  return (
    <Link
      {...props}
      getProps={({ isCurrent }) => {
        return {
          style: {
            color: isCurrent ? "red" : "blue",
          },
        };
      }}
    />
  );
};

export default NavLink;
