import React, { useEffect, useContext } from "react";
import AuthenticationService from "../../../services/AuthenticationService/AuthenticationService";
import { navigate } from "@reach/router";
import UserContext from "../../../context/UserContext/UserContext";

const Logout = () => {
  const setUser = useContext(UserContext)[1];

  useEffect(() => {
    async function doLogout() {
      await AuthenticationService.logout();

      setUser(false);

      navigate("/");
    }

    doLogout();
  }, [setUser]);

  return <>Please wait whilst we log you out.</>;
};

export default Logout;
