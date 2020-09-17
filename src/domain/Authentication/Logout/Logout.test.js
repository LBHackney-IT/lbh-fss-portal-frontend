import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import axiosMock from "axios";
import App from "../../../App";
var mockUsers = require("../../../../mock-api/mockUsers.json");
var sample = require("lodash/sample");

// prevent react-toastify and @reach/router from being mocked
jest.mock("react-toastify", () => ({
  ...jest.requireActual("react-toastify"),
}));

jest.mock("@reach/router", () => ({
  ...jest.requireActual("@reach/router"),
}));

beforeEach(() => {
  axiosMock.get.mockClear();
});

// grab mock user data
const mockUser = sample(mockUsers);

test.only("Logout redirects to Login page", async () => {
  // mock user data (so as to ensure user is authenticated)
  axiosMock.get.mockImplementationOnce(() =>
    Promise.resolve({ data: mockUser })
  );

  // render App
  render(<App />);

  // wait for log out button to render
  const logoutButton = await screen.findAllByTestId("logout");

  // click log out button
  fireEvent.click(logoutButton[0]);

  // check user is directed to /logout page
  expect(window.location.pathname).toEqual("/logout");

  // check user is redirected from logout page to login page
  const loginHeader = await screen.findByRole("heading", { name: /login/i });
  expect(loginHeader).not.toBeNull();
  expect(window.location.pathname).toEqual("/");
});
