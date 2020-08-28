import React from "react";
import { fireEvent, waitFor, screen, cleanup } from "@testing-library/react";
import EditUser from "./EditUser";
import axiosMock from "axios";
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
    Promise.resolve({ data: { mockUser } })
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

    fireEvent.click(screen.getByText(/save/i));

    const emailAlert = screen.queryByText(/Enter a valid e-mail address/);
    expect(emailAlert).toBeNull();
  });
});

// test.only("on successful edit, user is redirected to /users page", async () => {
//   axiosMock.get.mockImplementationOnce(() =>
//     Promise.resolve({ data: { mockUser } })
//   );
//   renderWithInternalPermissions(<EditUser />);

//   await finishLoading();

//   // update values in form
//   fireEvent.change(screen.getByLabelText(/email/i), {
//     target: { value: mockUser.email },
//   });
//   fireEvent.change(screen.getByLabelText(/name/i), {
//     target: { value: mockUser.name },
//   });

//   // specify mocked data to be returned
//   axiosMock.patch.mockImplementationOnce(() =>
//     Promise.resolve({ data: { mockUser } })
//   );

//   console.log(window.location.pathname);

//   // submit form
//   fireEvent.click(screen.getByText(/save/i));

//   await waitFor(() => {
//     expect(window.location.pathname).toEqual("/users");
//   });
//   console.log(window.location.pathname);

//   const member = await screen.findByText(/Member/i);
//   expect(member).toBeInTheDocument();

//   // await waitFor(() => {
//   //   expect(window.location.pathname).toEqual("/users");
//   // });

//   // expect(axiosMock.get).toHaveBeenCalledTimes(1);
//   // expect(axiosMock.patch).toHaveBeenCalledTimes(1);
// });

// test.only("on successful edit, user is redirected to /users page", async () => {
//   axiosMock.get.mockImplementationOnce(() =>
//     Promise.resolve({ data: { mockUser } })
//   );
//   renderWithInternalPermissions(<EditUser />);

//   await finishLoading();

//   // update values in form
//   fireEvent.change(screen.getByLabelText(/email/i), {
//     target: { value: mockUser.email },
//   });
//   fireEvent.change(screen.getByLabelText(/name/i), {
//     target: { value: mockUser.name },
//   });

//   console.log("path happy - pre submit");
//   console.log(window.location.pathname);

//   // specify mocked data to be returned
//   axiosMock.patch.mockImplementationOnce(() =>
//     Promise.resolve({ data: { mockUser } })
//   );

//   // submit form
//   fireEvent.click(screen.getByText(/save/i));

//   await waitFor(() => {
//     expect(window.location.pathname).toEqual("/users");
//   });

//   console.log("path happy - post submit");
//   console.log(window.location.pathname);

//   expect(axiosMock.patch).toHaveBeenCalledTimes(1);
// });

// test("on unsuccessful edit, user is not redirected to /users page", async () => {
//   axiosMock.get.mockImplementationOnce(() =>
//     Promise.resolve({ data: { mockUser } })
//   );

//   renderWithInternalPermissions(<EditUser />);

//   await finishLoading();

//   // update values in form
//   fireEvent.change(screen.getByLabelText(/email/i), {
//     target: { value: mockUser.email },
//   });
//   fireEvent.change(screen.getByLabelText(/name/i), {
//     target: { value: mockUser.name },
//   });

//   console.log("path sad - pre submit");
//   console.log(window.location.pathname);

//   // specify mocked data to be returned
//   axiosMock.patch.mockImplementationOnce(() =>
//     Promise.resolve({ data: false })
//   );

//   // submit form
//   fireEvent.click(screen.getByText(/save/i));

//   await waitFor(() => {
//     expect(window.location.pathname).toEqual("/users/1/edit");
//   });
//   console.log("path sad - post submit");
//   console.log(window.location.pathname);

//   expect(axiosMock.patch).toHaveBeenCalledTimes(1);
// });

// emailsWithCorrectPattern.forEach(async (email) => {
//   test(`email: ${email} with correct pattern does not trigger validation`, async () => {
//     await renderAndInitalise(<EditUser />);

//     fireEvent.change(screen.getByLabelText(/email/i), {
//       target: { value: email },
//     });

//     fireEvent.click(screen.getByText(/save/i));

//     const emailAlert = screen.queryByText(/Enter a valid e-mail address/);
//     expect(emailAlert).toBeNull();
//   });
// });
