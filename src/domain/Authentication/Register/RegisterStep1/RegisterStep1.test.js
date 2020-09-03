import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import axiosMock from "axios";
import { mockUser } from "../../../..//utils/testing/testing";

beforeEach(() => {
  axiosMock.post.mockClear();
});

/*test("email and password fields present", async () => {
  const { getByLabelText } = render(<Register />);

  expect(getByLabelText(/email/i)).toBeInTheDocument();
  expect(getByLabelText(/password/i)).toBeInTheDocument();
});

test("empty fields trigger validation message", async () => {
  render(<Register />);

  fireEvent.submit(screen.getByTestId("form"));

  const emailAlert = await screen.findByText(/email is required/i);
  const passwordAlert = await screen.findByText(/password is required/i);

  expect(emailAlert).toBeInTheDocument();
  expect(passwordAlert).toBeInTheDocument();
});

test("email maxLength triggers validation", async () => {
  render(<Register />);

  const emailLong = repeat(mockUser.email, 100);

  fireEvent.change(screen.getByLabelText(/email/i), {
    target: { value: emailLong },
  });

  fireEvent.submit(screen.getByTestId("form"));

  const emailAlert = await screen.findByText(/Max length exceeded/i);

  expect(emailAlert).toBeInTheDocument();
});

test("emails with incorrect pattern trigger validation", async () => {
  render(<Register />);

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
  render(<Register />);

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

test("password maxLength triggers validation", async () => {
  render(<Register />);

  const passwordLong = repeat("Password123", 100);

  fireEvent.change(screen.getByLabelText(/password/i), {
    target: { value: passwordLong },
  });

  fireEvent.submit(screen.getByTestId("form"));

  const passwordAlert = await screen.findByText(/Max length exceeded/i);

  expect(passwordAlert).toBeInTheDocument();
});

test("password minLength triggers validation", async () => {
  render(<Register />);

  const passwordShort = "Pass1";

  fireEvent.change(screen.getByLabelText(/password/i), {
    target: { value: passwordShort },
  });

  fireEvent.submit(screen.getByTestId("form"));

  const passwordAlert = await screen.findByText(
    /Password must be at least 6 characters/i
  );

  expect(passwordAlert).toBeInTheDocument();
});

test("passwords missing at least one capital letter trigger validation", async () => {
  render(<Register />);

  const passwordsWithoutCapital = ["password123", "aaa_111", "AbCdEfG1"];

  passwordsWithoutCapital.forEach(async (password) => {
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: password },
    });

    fireEvent.submit(screen.getByTestId("form"));

    const passwordAlert = await screen.findByText(
      /Password must contain at least one capital letter/i
    );

    expect(passwordAlert).toBeInTheDocument();
  });
});

test("passwords missing at least one number trigger validation", async () => {
  render(<Register />);

  const passwordsWithoutNumber = ["Password", "aaa_AAA", "aAbBcCdDeE"];

  passwordsWithoutNumber.forEach(async (password) => {
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: password },
    });

    fireEvent.submit(screen.getByTestId("form"));

    const passwordAlert = await screen.findByText(
      /Password must contain at least one number/i
    );

    expect(passwordAlert).toBeInTheDocument();
  });
});

test("passwords with correct pattern do not trigger validation", async () => {
  render(<Register />);

  const passwordsWithIncorrectPattern = [
    "xfgn@D4d",
    "wbfye6dvcEEd",
    "1fnfrf][D6d/",
    "pedk8~d??wQWE",
  ];

  passwordsWithIncorrectPattern.forEach(async (passwords) => {
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: passwords },
    });

    fireEvent.submit(screen.getByTestId("form"));

    const passwordAlert = await screen.findByText(/Password must/i);

    expect(passwordAlert).not.toBeInTheDocument();
  });
});*/
