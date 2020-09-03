import React from "react";
import { screen } from "@testing-library/react";
import ListUsers from "./ListUsers";
import {
  renderWithInternalPermissions,
  renderWithVcsoPermissions,
} from "../../../utils/testing/testing";

// prevent react-toastify and @reach/router from being mocked
jest.mock("react-toastify", () => ({
  ...jest.requireActual("react-toastify"),
}));

jest.mock("@reach/router", () => ({
  ...jest.requireActual("@reach/router"),
}));

test("get list users page if user has permissions", async () => {
  renderWithInternalPermissions(<ListUsers />);
  const heading = await screen.findByRole("heading");
  expect(heading).toHaveTextContent("Users");
  expect(heading).not.toHaveTextContent("Access Denied");
});

test("get access denied if user does not have permissions", async () => {
  renderWithVcsoPermissions(<ListUsers />);
  const heading = await screen.findByRole("heading");
  expect(heading).toHaveTextContent("Access Denied");
  expect(heading).not.toHaveTextContent("Users");
});
