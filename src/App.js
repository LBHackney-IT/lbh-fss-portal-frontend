import React from "react";
import "./App.css";
import { Router } from "@reach/router";
import Header from "./components/Header/Header";
import AnonymousRoute from "./helpers/AnonymousRoute/AnonymousRoute";
import ProtectedRoute from "./helpers/ProtectedRoute/ProtectedRoute";
import ListServices from "./domain/Services/ListServices/ListServices";
import ListUsers from "./domain/Users/ListUsers/ListUsers";
import Login from "./domain/Authentication/Login/Login";
import Register from "./domain/Authentication/Register/Register";
import PageNotFound from "./domain/Error/PageNotFound/PageNotFound";

function App() {
  return (
    <div className="App">
      <Header />
      <div>
        <Router>
          <AnonymousRoute as={Login} path="/" />
          <AnonymousRoute as={Register} path="/register" />
          <ProtectedRoute as={ListServices} path="/services" />
          <ProtectedRoute as={ListUsers} path="/users" />
          <PageNotFound default />
        </Router>
      </div>
    </div>
  );
}

export default App;
