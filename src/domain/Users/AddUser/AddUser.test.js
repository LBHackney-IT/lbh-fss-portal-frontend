import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import AddUser from "./AddUser";
import axiosMock from "axios";
import { toast } from "react-toastify";
import { navigate } from "@reach/router";
import {
  mockUser,
  renderWithInternalPermissions,
  renderWithVcsoPermissions,
} from "../../../utils/testing/testing";

test("unauthorised user gets access denied", async () => {
  renderWithVcsoPermissions(<AddUser />);

  expect(screen.getByText(/access denied/i)).toBeInTheDocument();
});

test("email, name and roles fields present", async () => {
  renderWithInternalPermissions(<AddUser />);

  expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
  expect(screen.getByText(/roles/i)).toBeInTheDocument();
});

test("empty fields trigger validation message", async () => {
  renderWithInternalPermissions(<AddUser />);

  fireEvent.click(screen.getByText(/create account/i));

  const emailAlert = await screen.findByText(/email is required/i);
  const nameAlert = await screen.findByText(/name is required/i);

  expect(emailAlert).toBeInTheDocument();
  expect(nameAlert).toBeInTheDocument();
});

test("emails with incorrect pattern trigger validation", async () => {
  renderWithInternalPermissions(<AddUser />);

  const emailsWithIncorrectPattern = ["test@.com", "test", "a@b", "abc@com"];

  emailsWithIncorrectPattern.forEach(async (email) => {
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: email },
    });

    fireEvent.click(screen.getByText(/create account/i));

    const emailAlert = await screen.findByText(/Enter a valid e-mail address/i);

    expect(emailAlert).toBeInTheDocument();
  });
});

test("emails with correct pattern do not trigger validation", async () => {
  renderWithInternalPermissions(<AddUser />);

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

    fireEvent.click(screen.getByText(/create account/i));

    const emailAlert = await screen.findByText(/Enter a valid e-mail address/i);

    expect(emailAlert).not.toBeInTheDocument();
  });
});

test("on successful addition of user, success notifcation is displayed and redirected to /users page", async () => {
  renderWithInternalPermissions(<AddUser />);

  // update values in form
  fireEvent.change(screen.getByLabelText(/email/i), {
    target: { value: mockUser.email },
  });
  fireEvent.change(screen.getByLabelText(/name/i), {
    target: { value: mockUser.name },
  });

  fireEvent.click(screen.getByTestId("checkbox-1"));

  // specify mocked data to be returned
  axiosMock.post.mockImplementationOnce(() =>
    Promise.resolve({
      data: {
        id: mockUser.id,
        name: mockUser.name,
        email: mockUser.email,
        roles: mockUser.roles,
      },
    })
  );

  // submit form
  fireEvent.click(screen.getByText(/create account/i));

  await waitFor(() => {
    expect(toast.success).toHaveBeenCalledTimes(1);
    expect(toast.success).toHaveBeenCalledWith(
      `New user ${mockUser.name} invited.`
    );

    expect(navigate).toHaveBeenCalledTimes(1);
    expect(navigate).toHaveBeenCalledWith("/users");
  });
});
