import React from "react";
import { screen } from "@testing-library/react";
import ListUsers from "./ListUsers";
import {
  renderWithInternalPermissions,
  renderWithVcsoPermissions,
  mockUsers,
} from "../../../utils/testing/testing";
import axiosMock from "axios";

test("get list users page if user has permissions", async () => {
  axiosMock.get.mockImplementationOnce(() =>
    Promise.resolve({ data: { entries: mockUsers } })
  );
  renderWithInternalPermissions(<ListUsers />);
  const addUser = await screen.findByText("Add user");
  expect(addUser).toBeInTheDocument();
});

test("get access denied if user does not have permissions", async () => {
  axiosMock.get.mockImplementationOnce(() =>
    Promise.resolve({ data: { entries: mockUsers } })
  );
  renderWithVcsoPermissions(<ListUsers />);
  const accessDenied = await screen.findByText("Access Denied");
  expect(accessDenied).toBeInTheDocument();
});
