import React, { useContext } from "react";
import { Redirect } from "@reach/router";
import AnonymousLayout from "../../components/AnonymousLayout/AnonymousLayout";
import UserContext from "../../context/UserContext/UserContext";

const AnonymousRoute = ({ as: Component, ...props }) => {
  const user = useContext(UserContext)[0];

  if (user.set_password_required) {
    return <Redirect to="/account" noThrow />;
  }

  if (user) {
    return <Redirect to="/organisation" noThrow />;
  }

  return (
    <>
      <AnonymousLayout>
        <Component {...props} />
      </AnonymousLayout>
    </>
  );
};

export default AnonymousRoute;
