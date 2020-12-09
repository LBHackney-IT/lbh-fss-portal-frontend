import React, { useEffect, useContext } from "react";
import AuthenticationService from "../../../services/AuthenticationService/AuthenticationService";
import { navigate } from "@reach/router";
import UserContext from "../../../context/UserContext/UserContext";
import { toast } from "react-toastify";
import AppLoading from "../../../AppLoading";

const Logout = () => {
  const setUser = useContext(UserContext)[1];

  useEffect(() => {
    async function doLogout() {
      const hasLoggedOut = await AuthenticationService.logout();

      if (hasLoggedOut) {
        setUser(false);

        navigate("/");
      } else {
        toast.error("Failed to logout.");
      }
    }

    doLogout();
  }, [setUser]);

  return <AppLoading />;
};

export default Logout;
