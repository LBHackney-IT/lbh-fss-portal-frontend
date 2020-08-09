import React, { useContext, useEffect, useState } from "react";
import { Router } from "@reach/router";
import AnonymousRoute from "./helpers/AnonymousRoute/AnonymousRoute";
import ProtectedRoute from "./helpers/ProtectedRoute/ProtectedRoute";
import ListServices from "./domain/Services/ListServices/ListServices";
import Login from "./domain/Authentication/Login/Login";
import Register from "./domain/Authentication/Register/Register";
import PageNotFound from "./domain/Error/PageNotFound/PageNotFound";
import AddUser from "./domain/Users/AddUser/AddUser";
import EditUser from "./domain/Users/EditUser/EditUser";
import ListUsers from "./domain/Users/ListUsers/ListUsers";
import MyAccount from "./domain/Users/MyAccount/MyAccount";
import AnalyticsDashboard from "./domain/Analytics/AnalyticsDashboard/AnalyticsDashboard";
import ResetPassword from "./domain/Authentication/ResetPassword/ResetPassword";
import AuthenticationService from "./services/AuthenticationService/AuthenticationService";
import UserContext from "./context/UserContext/UserContext";
import AppLoading from "./AppLoading";

const AppMain = () => {
  // eslint-disable-next-line
  const [user, setUser] = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchMe() {
      const user = await AuthenticationService.me();

      setUser(user);
      setIsLoading(false);
    }

    fetchMe();
  }, [setUser, setIsLoading]);

  return isLoading ? (
    <AppLoading />
  ) : (
    <Router>
      <AnonymousRoute as={Login} path="/" />
      <AnonymousRoute as={Register} path="/register" />
      <AnonymousRoute as={ResetPassword} path="/password" />
      <ProtectedRoute as={ListServices} path="/services" />
      <ProtectedRoute as={ListUsers} path="/users" />
      <ProtectedRoute as={AddUser} path="/users/add" />
      <ProtectedRoute as={EditUser} path="/users/:userId/edit" />
      <ProtectedRoute as={MyAccount} path="/users/account" />
      <ProtectedRoute as={AnalyticsDashboard} path="/analytics" />
      <PageNotFound default />
    </Router>
  );
};

export default AppMain;
