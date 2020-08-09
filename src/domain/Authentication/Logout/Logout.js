import React, { useEffect } from "react";
import AuthenticationService from "../../../services/AuthenticationService/AuthenticationService";
import { navigate } from "@reach/router";

const Logout = () => {
  useEffect(() => {
    async function doLogout() {
      await AuthenticationService.logout();

      navigate("/");
    }

    doLogout();
  }, []);

  return <>Please wait whilst we log you out.</>;
};

export default Logout;
