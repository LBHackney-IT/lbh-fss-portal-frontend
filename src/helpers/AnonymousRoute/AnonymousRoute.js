import React, { useContext } from "react";
import { Redirect } from "@reach/router";
import AnonymousLayout from "../../components/AnonymousLayout/AnonymousLayout";
import UserContext from "../../context/UserContext/UserContext";

const AnonymousRoute = ({ as: Component, ...props }) => {
  const user = useContext(UserContext)[0];

  return (
    <>
      {user ? (
        <Redirect to="/services" noThrow />
      ) : (
        <AnonymousLayout {...props}>
          <Component />
        </AnonymousLayout>
      )}
    </>
  );
};

export default AnonymousRoute;
