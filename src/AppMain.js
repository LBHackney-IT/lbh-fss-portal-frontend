import React, { useContext, useEffect, useState } from "react";
import { Router } from "@reach/router";
import AnonymousRoute from "./helpers/AnonymousRoute/AnonymousRoute";
import ProtectedRoute from "./helpers/ProtectedRoute/ProtectedRoute";
import ListServices from "./domain/Services/ListServices/ListServices";
import Login from "./domain/Authentication/Login/Login";
import RegisterStep1 from "./domain/Authentication/Register/RegisterStep1/RegisterStep1";
import RegisterStep2 from "./domain/Authentication/Register/RegisterStep2/RegisterStep2";
import RegisterStep3 from "./domain/Authentication/Register/RegisterStep3/RegisterStep3";
import ResetPasswordConfirmation from "./domain/Authentication/ResetPasswordConfirmation/ResetPasswordConfirmation";
import TermsAndConditions from "./domain/Authentication/TermsAndConditions/TermsAndConditions";
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
import Logout from "./domain/Authentication/Logout/Logout";
import AddService from "./domain/Services/AddService/AddService";
import EditService from "./domain/Services/EditService/EditService";
import MyOrganisation from "./domain/Organisations/MyOrganisation/MyOrganisation";
import SearchGroups from "./domain/Search/SearchGroups/SearchGroups";
import ListOrganisations from "./domain/Organisations/ListOrganisations/ListOrganisations";
import AddOrganisation from "./domain/Organisations/AddOrganisation/AddOrganisation";
import EditOrganisation from "./domain/Organisations/EditOrganisation/EditOrganisation";

const AppMain = ({ location }) => {
  const setUser = useContext(UserContext)[1];
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
      <AnonymousRoute as={RegisterStep1} path="/register/step-1" />
      <AnonymousRoute as={RegisterStep2} path="/register/step-2" />
      <AnonymousRoute as={RegisterStep3} path="/register/step-3" />
      <AnonymousRoute as={ResetPassword} path="/password" />
      <AnonymousRoute as={ResetPasswordConfirmation} path="/password/reset" />
      <AnonymousRoute as={TermsAndConditions} path="/terms-and-conditions" />
      <ProtectedRoute as={ListServices} path="/services" />
      <ProtectedRoute as={ListUsers} path="/users" />
      <ProtectedRoute as={AddUser} path="/users/add" />
      <ProtectedRoute as={EditUser} path="/users/:userId/edit" />
      <ProtectedRoute as={MyAccount} path="/account" />
      <ProtectedRoute as={AnalyticsDashboard} path="/analytics" />
      <ProtectedRoute as={Logout} path="/logout" withLayout={false} />
      <ProtectedRoute as={AddService} path="/services/add/" />
      <ProtectedRoute as={AddService} path="/services/add/:step" />
      <ProtectedRoute as={EditService} path="/services/:serviceId/edit/" />
      <ProtectedRoute as={EditService} path="/services/:serviceId/edit/:step" />
      <ProtectedRoute as={MyOrganisation} path="/organisation" />
      <ProtectedRoute as={ListOrganisations} path="/organisations" />
      <ProtectedRoute as={AddOrganisation} path="/organisations/add/" />
      <ProtectedRoute as={AddOrganisation} path="/organisations/add/:step" />
      <ProtectedRoute
        as={EditOrganisation}
        path="/organisations/:organisationId/edit/"
      />
      <ProtectedRoute
        as={EditOrganisation}
        path="/organisations/:organisationId/edit/:step"
      />
      <ProtectedRoute as={SearchGroups} path="/search" />
      <PageNotFound default />
    </Router>
  );
};

export default AppMain;
