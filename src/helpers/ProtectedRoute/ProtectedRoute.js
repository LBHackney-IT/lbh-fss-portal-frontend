import React from "react";
import { Redirect } from "@reach/router";
import ProtectedLayout from "../../components/ProtectedLayout/ProtectedLayout";

const ProtectedRoute = ({ as: Component, ...props }) => {
  //const { user } = useContext(UserContext)
  const user = false;
  return (
    <>
      {user ? (
        <ProtectedLayout>
          <Component {...props} />
        </ProtectedLayout>
      ) : (
        <Redirect to="/" noThrow />
      )}
    </>
  );
};

export default ProtectedRoute;
