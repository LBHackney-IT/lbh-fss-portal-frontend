import React from "react";
import { render, waitFor, screen } from "@testing-library/react";
import UserContext from "../../context/UserContext/UserContext";
var mockUsers = require("../../../mock-api/mockUsers.json");
var sample = require("lodash/sample");

const mockUser = sample(mockUsers);

let fakeUser = {
  id: 1,
  name: "fakeName",
  email: "fakeEmail@example.com",
  organisation: { name: "fakeOrganisation" },
  statuses: "active",
};

function renderComponentWithRoles(component, roles) {
  fakeUser.roles = roles;
  const fakeUserWithPermissions = fakeUser;
  render(
    <UserContext.Provider value={[fakeUserWithPermissions, null]}>
      {component}
    </UserContext.Provider>
  );
}

function renderWithInternalPermissions(component) {
  renderComponentWithRoles(component, ["admin", "viewer"]);
}

function renderWithVcsoPermissions(component) {
  renderComponentWithRoles(component, ["vcso"]);
}

const finishLoading = () =>
  waitFor(() => expect(screen.queryByTestId("loading")).toBeNull());

export {
  renderWithInternalPermissions,
  renderWithVcsoPermissions,
  finishLoading,
  mockUser,
  mockUsers,
};
