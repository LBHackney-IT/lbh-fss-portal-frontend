import React from "react";
import { Redirect } from "@reach/router";
import AnonymousLayout from "../../components/AnonymousLayout/AnonymousLayout";

const AnonymousRoute = ({ as: Component, ...props }) => {
  //const { user } = useContext(UserContext)
  const user = true;
  return (
    <>
      {user ? (
        <Redirect to="/services" noThrow />
      ) : (
        <AnonymousLayout>
          <Component {...props} />
        </AnonymousLayout>
      )}
    </>
  );
};

export default AnonymousRoute;
