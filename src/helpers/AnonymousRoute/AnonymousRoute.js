import React from "react";
import { Redirect } from "@reach/router";

const AnonymousRoute = ({ as: Component, ...props }) => {
  //const { user } = useContext(UserContext)
  const user = true;
  return (
    <div>
      {user ? <Redirect to="/services" noThrow /> : <Component {...props} />}
    </div>
  );
};

export default AnonymousRoute;
