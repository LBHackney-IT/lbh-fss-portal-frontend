import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import Login from "./Login";
import axiosMock from "axios";
import { mockUser } from '../../../utils/testing/testing'

beforeEach(() => {
  axiosMock.post.mockClear();
});


test("email and password fields present", async () => {
  const { getByLabelText } = render(<Login />);

  expect(getByLabelText(/email/i)).toBeInTheDocument();
  expect(getByLabelText(/password/i)).toBeInTheDocument();
});

test("empty fields trigger validation message", async () => {
  render(<Login />);

  fireEvent.submit(screen.getByTestId("form"));

  const emailAlert = await screen.findByText(/email is required/i);
  const passwordAlert = await screen.findByText(/password is required/i);

  expect(emailAlert).toBeInTheDocument();
  expect(passwordAlert).toBeInTheDocument();
});

test("emails with incorrect pattern trigger validation", async () => {
  render(<Login />);

  const emailsWithIncorrectPattern = ["test@.com", "test", "a@b", "abc@com"];

  emailsWithIncorrectPattern.forEach(async (email) => {
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: email },
    });

    fireEvent.submit(screen.getByTestId("form"));

    const emailAlert = await screen.findByText(/Enter a valid e-mail address/i);

    expect(emailAlert).toBeInTheDocument();
  });
});

test("emails with correct pattern do not trigger validation", async () => {
  render(<Login />);

  const emailsWithIncorrectPattern = [
    "test@example.com",
    "test12D@gmail.com",
    "nudge@nudgedigital.co.uk",
    "microsoft@hotmail.com",
  ];

  emailsWithIncorrectPattern.forEach(async (email) => {
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: email },
    });

    fireEvent.submit(screen.getByTestId("form"));

    const emailAlert = await screen.findByText(/Enter a valid e-mail address/i);

    expect(emailAlert).not.toBeInTheDocument();
  });
});

test("login as an existing user", async () => {
  render(<Login />);

  // update values in form
  fireEvent.change(screen.getByLabelText(/email/i), {
    target: { value: mockUser.email },
  });
  fireEvent.change(screen.getByLabelText(/password/i), {
    target: { value: "fakePassword123" },
  });

  // specify mocked data to be returned
  axiosMock.post.mockImplementationOnce(() =>
    Promise.resolve({ data: mockUser })
  );

  // submit form
  fireEvent.submit(screen.getByTestId("form"));

  // await redirect from /login to /services
  await waitFor(() => {
    expect(window.location.href).toContain("services");
  });

  expect(axiosMock.post).toHaveBeenCalledTimes(1);
});
