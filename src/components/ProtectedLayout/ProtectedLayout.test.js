import React from "react";
import { screen } from "@testing-library/react";
import ProtectedLayout from "./ProtectedLayout";
import {
  renderWithInternalPermissions,
  renderWithVcsoPermissions,
} from "../../utils/testing/testing";

// prevent react-toastify and @reach/router from being mocked
jest.mock("react-toastify", () => ({
  ...jest.requireActual("react-toastify"),
}));

jest.mock("@reach/router", () => ({
  ...jest.requireActual("@reach/router"),
}));

test("internal team menu links appear for users with permissions", async () => {
  await renderWithInternalPermissions(<ProtectedLayout />);
  const menuLinks = await screen.getAllByTestId("navigation");
  expect(menuLinks[0]).toHaveTextContent("View site");
  expect(menuLinks[1]).toHaveTextContent("My account");
  expect(menuLinks[2]).toHaveTextContent("Log out");
  expect(menuLinks[3]).toHaveTextContent("Organisations");
  expect(menuLinks[4]).toHaveTextContent("Listings");
  expect(menuLinks[5]).toHaveTextContent("Users");
  expect(menuLinks[6]).toHaveTextContent("Analytics");
  expect(menuLinks[7]).toHaveTextContent("Search");
  expect(menuLinks[8]).toHaveTextContent("View site");
  expect(menuLinks[9]).toHaveTextContent("My account");
  expect(menuLinks[10]).toHaveTextContent("Log out");
});

test("internal team menu links do not appear for users without permissions", async () => {
  await renderWithVcsoPermissions(<ProtectedLayout />);
  const menuLinks = await screen.getAllByTestId("navigation");
  expect(menuLinks[0]).toHaveTextContent("My account");
  expect(menuLinks[1]).toHaveTextContent("Log out");
  expect(menuLinks[2]).toHaveTextContent("Your organisation");
  expect(menuLinks[3]).toHaveTextContent("Your listings");
  expect(menuLinks[4]).toHaveTextContent("My account");
  expect(menuLinks[5]).toHaveTextContent("Log out");
});
