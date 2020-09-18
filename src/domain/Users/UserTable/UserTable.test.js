import React from "react";
import { render, screen } from "@testing-library/react";
import axiosMock from "axios";
import UserTable from "./UserTable";
import { mockUsers } from "../../../utils/testing/testing";

jest.mock("@reach/router", () => ({
  ...jest.requireActual("@reach/router"),
}));

test("table column headings are correct", async () => {
  render(<UserTable data={mockUsers} isLoading={false} search={"ab"} />);

  const columnHeaders = await screen.findAllByTestId("columnheader");

  expect(columnHeaders).toHaveLength(5);

  const correctHeaders = [
    "Name",
    "Organisation",
    "Roles",
    "Member for",
    "Last access",
  ];

  let i;
  for (i = 0; i < columnHeaders.length; i++) {
    expect(columnHeaders[i]).toHaveTextContent(correctHeaders[i]);
  }
});

test("table has correct number of rows", async () => {
  render(<UserTable data={mockUsers} />);

  const tableRows = await screen.findAllByTestId("row");

  expect(tableRows).toHaveLength(10);
});
