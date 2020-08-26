import React from "react";
import { screen } from "@testing-library/react";
import ProtectedLayout from "./ProtectedLayout";
import {
  renderWithInternalPermissions,
  renderWithVcsoPermissions,
} from "../../utils/testing/testing";

test("internal team menu links appear for users with permissions", async () => {
  renderWithInternalPermissions(<ProtectedLayout />);
  const menuLinks = await screen.getAllByRole("navigation");
  expect(menuLinks[0]).toHaveTextContent("View site");
  expect(menuLinks[1]).toHaveTextContent("Users");
  expect(menuLinks[1]).toHaveTextContent("Organisations");
  expect(menuLinks[1]).toHaveTextContent("Analytics");
  expect(menuLinks[1]).toHaveTextContent("Search");
});

test("internal team menu links do not appear for users without permissions", async () => {
  renderWithVcsoPermissions(<ProtectedLayout />);
  const menuLinks = await screen.getAllByRole("navigation");
  expect(menuLinks[0]).not.toHaveTextContent("View site");
  expect(menuLinks[1]).not.toHaveTextContent("Users");
  expect(menuLinks[1]).not.toHaveTextContent("Organisations");
  expect(menuLinks[1]).not.toHaveTextContent("Analytics");
  expect(menuLinks[1]).not.toHaveTextContent("Search");
});

test("vcso menu links appear for users with permissions", async () => {
  renderWithVcsoPermissions(<ProtectedLayout />);
  const menuLinks = await screen.getAllByRole("navigation");
  expect(menuLinks[1]).toHaveTextContent("Your organisation");
  expect(menuLinks[1]).toHaveTextContent("Your listings");
});

test("vcso team menu links do not appear for users without permissions", async () => {
  renderWithInternalPermissions(<ProtectedLayout />);
  const menuLinks = await screen.getAllByRole("navigation");
  expect(menuLinks[1]).not.toHaveTextContent("Your organisation");
  expect(menuLinks[1]).not.toHaveTextContent("Your listings");
});
