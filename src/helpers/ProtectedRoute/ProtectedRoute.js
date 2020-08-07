import React from "react";
import { Redirect } from "@reach/router";

const ProtectedRoute = ({ as: Component, ...props }) => {
  //const { user } = useContext(UserContext)
  const user = true;
  return (
    <div>{user ? <Component {...props} /> : <Redirect to="/" noThrow />}</div>
  );
};

export default ProtectedRoute;
