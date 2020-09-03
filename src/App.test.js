import React from "react";
import { render, waitFor } from "@testing-library/react";
import App from "./App";

// prevent react-toastify and @reach/router from being mocked
jest.mock("react-toastify", () => ({
  ...jest.requireActual("react-toastify"),
}));

jest.mock("@reach/router", () => ({
  ...jest.requireActual("@reach/router"),
}));

test("renders learn react link", async () => {
  const { getByText } = render(<App />);

  await waitFor(() => {
    expect(getByText(/hackney/i)).toBeInTheDocument();
  });
});
