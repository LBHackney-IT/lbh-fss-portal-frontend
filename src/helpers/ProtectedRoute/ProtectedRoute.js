import React, { useContext } from "react";
import { Redirect } from "@reach/router";
import ProtectedLayout from "../../components/ProtectedLayout/ProtectedLayout";
import UserContext from "../../context/UserContext/UserContext";

const ProtectedRoute = ({ as: Component, ...props }) => {
  const user = useContext(UserContext)[0];
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
