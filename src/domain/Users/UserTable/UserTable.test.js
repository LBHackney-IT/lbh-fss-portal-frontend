import React from "react";
import { render, screen } from "@testing-library/react";
import axiosMock from "axios";
import UserTable from "./UserTable";

beforeEach(() => {
  axiosMock.get.mockClear();
});

// prevent react-toastify and @reach/router from being mocked
jest.mock("react-toastify", () => ({
  ...jest.requireActual("react-toastify"),
}));

jest.mock("@reach/router", () => ({
  ...jest.requireActual("@reach/router"),
}));

const mockUsers = {
  entries: [
    {
      id: 21,
      name: "Alanna Blick",
      email: "Heaven_Leffler21@yahoo.com",
      organisation: { name: "Gibson, Bergnaum and Trantow" },
      statuses: "active",
      roles: ["viewer"],
    },
    {
      id: 22,
      name: "Alayna Bednar",
      email: "Kristian.Kozey@gmail.com",
      organisation: { name: "DuBuque - Cormier" },
      statuses: "active",
      roles: ["admin", "vcso", "viewer"],
    },
    {
      id: 75,
      name: "Alexandro Nader",
      email: "Nakia8@gmail.com",
      organisation: { name: "Gorczany and Sons" },
      statuses: "active",
      roles: ["admin", "viewer", "vcso"],
    },
    {
      id: 57,
      name: "Alfreda Reilly",
      email: "Clovis55@yahoo.com",
      organisation: { name: "Upton - Windler" },
      statuses: "active",
      roles: ["viewer", "vcso", "admin"],
    },
    {
      id: 10,
      name: "Alta Davis",
      email: "Herbert9@gmail.com",
      organisation: { name: "Hamill, Koepp and Lowe" },
      statuses: "active",
      roles: ["admin", "viewer", "vcso"],
    },
    {
      id: 74,
      name: "Angelina Schulist",
      email: "Mina.Marquardt95@yahoo.com",
      organisation: { name: "Spencer - Stehr" },
      statuses: "active",
      roles: ["viewer", "admin"],
    },
    {
      id: 69,
      name: "Arnaldo Klocko",
      email: "Nathanial.Brakus@gmail.com",
      organisation: { name: "Streich, Champlin and O'Conner" },
      statuses: "active",
      roles: ["viewer", "admin"],
    },
    {
      id: 60,
      name: "Bettie Franecki",
      email: "Taurean13@gmail.com",
      organisation: { name: "Quitzon, Johnson and Boyle" },
      statuses: "active",
      roles: ["viewer", "vcso", "admin"],
    },
    {
      id: 94,
      name: "Birdie Jast",
      email: "Ignatius87@gmail.com",
      organisation: { name: "Becker - Waelchi" },
      statuses: "active",
      roles: ["admin", "vcso"],
    },
    {
      id: 81,
      name: "Bobbie Rempel",
      email: "Lorine.Kohler@gmail.com",
      organisation: { name: "Hirthe - Brown" },
      statuses: "active",
      roles: ["viewer"],
    },
  ],
  limit: 10,
  offset: 0,
  search: "",
  order: [{ by: "name", direction: "ASC" }],
  total_count: 101,
};

test("table column headings are correct", async () => {
  axiosMock.get.mockImplementationOnce(() =>
    Promise.resolve({ data: mockUsers })
  );

  render(<UserTable />);

  const columnHeaders = await screen.findAllByRole("columnheader");

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
  axiosMock.get.mockImplementationOnce(() =>
    Promise.resolve({ data: mockUsers })
  );

  render(<UserTable />);

  const tableRows = await screen.findAllByRole("row");

  // note - one additional row for column headings
  expect(tableRows).toHaveLength(mockUsers.entries.length + 1);
});

test("first row of table data in correct columns", async () => {
  axiosMock.get.mockImplementationOnce(() =>
    Promise.resolve({ data: mockUsers })
  );

  render(<UserTable />);

  const tableRows = await screen.findAllByRole("cell");

  expect(tableRows[0]).toHaveTextContent("Alanna");
  expect(tableRows[1]).toHaveTextContent("Gibson");
  expect(tableRows[2]).toHaveTextContent("Hackney");
  expect(tableRows[3].textContent).toBe("");
  expect(tableRows[4].textContent).toBe("");
});
