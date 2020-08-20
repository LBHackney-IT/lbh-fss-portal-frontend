import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import Login from './Login';
import axiosMock from 'axios';
import { repeat } from 'lodash';
var mockUsers = require("../../../../mock-api/users/mockUsers.json");
var sample = require("lodash/sample");

beforeEach(() => {
    axiosMock.post.mockClear();
})

// grab mock user data
const mockUser = sample(mockUsers);

test('email and password fields present', async () => {
    const { getByLabelText } = render(<Login />);

    expect(getByLabelText(/email/i)).toBeInTheDocument()
    expect(getByLabelText(/password/i)).toBeInTheDocument()
});

test('empty fields trigger validation message', async () => {
    const { getByTestId, getByText } = render(<Login />);

    fireEvent.submit(getByTestId('form'));

    await waitFor(() => {
        expect(getByText(/email is required/i)).toBeInTheDocument()
    })
    await waitFor(() => {
        expect(getByText(/password is required/i)).toBeInTheDocument()
    })
});

test('email maxLength triggers validation', async () => {
    const { getByTestId, getByLabelText, getByText } = render(<Login />);

    const emailLong = repeat(mockUser.email, 100)

    fireEvent.change(getByLabelText(/email/i), { target: { value: emailLong } });

    fireEvent.submit(getByTestId('form'));

    await waitFor(() => {
        expect(getByText(/Max length exceeded/i)).toBeInTheDocument()
    })
});

test('emails with incorrect pattern trigger validation', async () => {
    const { getByTestId, getByLabelText, getByText } = render(<Login />);

    const emailsWithIncorrectPattern = ['test@.com', 'test', 'a@b', 'abc@com']

    emailsWithIncorrectPattern.forEach(async (email) => {
        fireEvent.change(getByLabelText(/email/i), { target: { value: email } });

        fireEvent.submit(getByTestId('form'));

        await waitFor(() => {
            expect(getByText(/Enter a valid e-mail address/i)).toBeInTheDocument()
        })
    })
});

test('emails with correct pattern do not trigger validation', async () => {
    const { getByTestId, getByLabelText, getByText } = render(<Login />);

    const emailsWithIncorrectPattern = ['test@example.com', 'test12D@gmail.com', 'nudge@nudgedigital.co.uk', 'microsoft@hotmail.com']

    emailsWithIncorrectPattern.forEach(async (email) => {
        fireEvent.change(getByLabelText(/email/i), { target: { value: email } });

        fireEvent.submit(getByTestId('form'));

        await waitFor(() => {
            expect(getByText(/Enter a valid e-mail address/i)).not.toBeInTheDocument()
        })
    })
});

test('password maxLength triggers validation', async () => {
    const { getByTestId, getByLabelText, getByText } = render(<Login />);

    const passwordLong = repeat('Password123', 100)

    fireEvent.change(getByLabelText(/password/i), { target: { value: passwordLong } });

    fireEvent.submit(getByTestId('form'));

    await waitFor(() => {
        expect(getByText(/Max length exceeded/i)).toBeInTheDocument()
    })
});

test('password minLength triggers validation', async () => {
    const { getByTestId, getByLabelText, getByText } = render(<Login />);

    const passwordShort = 'Pass1'

    fireEvent.change(getByLabelText(/password/i), { target: { value: passwordShort } });

    fireEvent.submit(getByTestId('form'));

    await waitFor(() => {
        expect(getByText(/Password must be more than 6 characters/i)).toBeInTheDocument()
    })
});

test('passwords missing at least one capital letter trigger validation', async () => {
    const { getByTestId, getByLabelText, getByText } = render(<Login />);

    const passwordsWithoutCapital = ['password123', 'aaa_111', 'AbCdEfG1']

    passwordsWithoutCapital.forEach(async (password) => {
        fireEvent.change(getByLabelText(/password/i), { target: { value: password } });

        fireEvent.submit(getByTestId('form'));

        await waitFor(() => {
            expect(getByText(/Password must contain at least one capital letter/i)).toBeInTheDocument()
        })
    })
});

test('passwords missing at least one number trigger validation', async () => {
    const { getByTestId, getByLabelText, getByText } = render(<Login />);

    const passwordsWithoutNumber = ['Password', 'aaa_AAA', 'aAbBcCdDeE']

    passwordsWithoutNumber.forEach(async (password) => {
        fireEvent.change(getByLabelText(/password/i), { target: { value: password } });

        fireEvent.submit(getByTestId('form'));

        await waitFor(() => {
            expect(getByText(/Password must contain at least one number/i)).toBeInTheDocument()
        })
    })
});

test('passwords with correct pattern do not trigger validation', async () => {
    const { getByTestId, getByLabelText, getByText } = render(<Login />);

    const passwordsWithIncorrectPattern = ['xfgn@D4d', 'wbfye6dvcEEd', '1fnfrf][D6d/', 'pedk8~d??wQWE']

    passwordsWithIncorrectPattern.forEach(async (passwords) => {
        fireEvent.change(getByLabelText(/password/i), { target: { value: passwords } });

        fireEvent.submit(getByTestId('form'));

        await waitFor(() => {
            expect(getByText(/Password must/i)).not.toBeInTheDocument()
        })
    })
});

test('login as an existing user', async () => {
    const { getByTestId, getByLabelText } = render(<Login />);

    // update values in form 
    fireEvent.change(getByLabelText(/email/i), { target: { value: mockUser.email } });
    fireEvent.change(getByLabelText(/password/i), { target: { value: 'fakePassword123' } });

    // specify mocked data to be returned
    axiosMock.post.mockImplementationOnce(() => Promise.resolve({ data: mockUser }));

    // submit form 
    fireEvent.submit(getByTestId('form'));

    // await redirect from /login to /services 
    await waitFor(() => {
        expect(window.location.href).toContain('services');
    })

    expect(axiosMock.post).toHaveBeenCalledTimes(1);
})