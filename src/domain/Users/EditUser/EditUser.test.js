import React from "react";
import { fireEvent, waitFor, screen, cleanup } from "@testing-library/react";
import EditUser from "./EditUser";
import axiosMock from "axios";
import { toast } from "react-toastify";
import { navigate } from "@reach/router";
import {
  mockUser,
  renderWithInternalPermissions,
  renderWithVcsoPermissions,
  finishLoading,
} from "../../../utils/testing/testing";
import { repeat } from "lodash";

beforeEach(() => {
  jest.clearAllMocks();
  axiosMock.get.mockReset();
  axiosMock.patch.mockReset();
});

async function renderAndInitalise(component) {
  axiosMock.get.mockImplementationOnce(() =>
    Promise.resolve({ data: mockUser })
  );

  renderWithInternalPermissions(component);

  await finishLoading();
}

test("unauthorised user gets access denied", async () => {
  axiosMock.get.mockImplementationOnce(() =>
    Promise.resolve({ data: { mockUser } })
  );

  renderWithVcsoPermissions(<EditUser />);

  await finishLoading();

  const accessDeniedAlert = await screen.findByText(/access denied/i);

  expect(accessDeniedAlert).toBeInTheDocument();
});

test("email, name, password, confirm password and roles fields present", async () => {
  await renderAndInitalise(<EditUser />);

  expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
  expect(screen.getByText("Password")).toBeInTheDocument();
  expect(screen.getByText("Confirm password")).toBeInTheDocument();
  expect(screen.getByText(/roles/i)).toBeInTheDocument();
});

test("empty fields trigger validation message", async () => {
  await renderAndInitalise(<EditUser />);

  fireEvent.change(screen.getByLabelText(/email/i), {
    target: { value: "" },
  });
  fireEvent.change(screen.getByLabelText(/name/i), {
    target: { value: "" },
  });

  const saveButton = await screen.findByText(/save/i);
  fireEvent.click(saveButton);

  const emailAlert = await screen.findByText(/email is required/i);
  const nameAlert = await screen.findByText(/name is required/i);

  expect(emailAlert).toBeInTheDocument();
  expect(nameAlert).toBeInTheDocument();
});

async function checkMaxLengthTriggerValidation(field) {
  await renderAndInitalise(<EditUser />);

  const label = new RegExp(field, "i");

  await screen.findByLabelText(label);

  const fieldLong = repeat(mockUser[field], 100);

  fireEvent.change(screen.getByLabelText(label), {
    target: { value: fieldLong },
  });

  fireEvent.click(screen.getByText(/save/i));

  const fieldAlert = await screen.findByText(/Max length exceeded/i);
  expect(fieldAlert).toBeInTheDocument();
}

test("name maxLength triggers validation", async () => {
  await checkMaxLengthTriggerValidation("name");
});

test("email maxLength triggers validation", async () => {
  await checkMaxLengthTriggerValidation("email");
});

const emailsWithIncorrectPattern = ["test@.com", "test", "a@b", "abc@com"];

emailsWithIncorrectPattern.forEach(async (email) => {
  test(`email: ${email} with incorrect pattern trigger validation`, async () => {
    await renderAndInitalise(<EditUser />);

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: email },
    });

    fireEvent.click(screen.getByText(/save/i));

    const emailAlert = await screen.findByText(/Enter a valid e-mail address/i);
    expect(emailAlert).toBeInTheDocument();
  });
});

const emailsWithCorrectPattern = [
  "test@example.com",
  "test12D@gmail.com",
  "nudge@nudgedigital.co.uk",
  "microsoft@hotmail.com",
];

emailsWithCorrectPattern.forEach(async (email) => {
  test(`email: ${email} with correct pattern does not trigger validation`, async () => {
    await renderAndInitalise(<EditUser />);

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: email },
    });

    axiosMock.patch.mockImplementationOnce(() =>
      Promise.resolve({ data: { mockUser } })
    );

    const saveButton = await screen.findByText(/save/i);
    fireEvent.click(saveButton);

    await waitFor(() => {
      const emailAlert = screen.queryByText(/Enter a valid e-mail address/);
      expect(emailAlert).toBeNull();
    });
  });
});

test("on successful edit, user is shown success notifcation and redirected to /users page", async () => {
  await renderAndInitalise(<EditUser />);

  axiosMock.patch.mockImplementationOnce(() =>
    Promise.resolve({ data: mockUser })
  );

  const saveButton = await screen.findByText(/save/i);
  fireEvent.click(saveButton);

  await waitFor(() => {
    expect(toast.success).toHaveBeenCalledTimes(1);
    expect(toast.success).toHaveBeenCalledWith(
      `User ${mockUser.name} updated.`
    );

    expect(navigate).toHaveBeenCalledTimes(1);
    expect(navigate).toHaveBeenCalledWith("/users");
  });
});

test("on unsuccessful edit, user is shown fail notifcation and no page redirect", async () => {
  await renderAndInitalise(<EditUser />);

  axiosMock.patch.mockImplementationOnce(() =>
    Promise.resolve({ data: false })
  );

  const saveButton = await screen.findByText(/save/i);
  fireEvent.click(saveButton);

  await waitFor(() => {
    expect(toast.error).toHaveBeenCalledTimes(1);
    expect(toast.error).toHaveBeenCalledWith("Unable to edit user.");

    expect(navigate).toHaveBeenCalledTimes(0);
  });
});
