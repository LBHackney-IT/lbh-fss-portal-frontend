import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import Login from './Login';
import axiosMock from 'axios';
var mockUsers = require("../../../../mock-api/users/mockUsers.json");
var sample = require("lodash/sample");

beforeEach(() => {
    // replace line below 'token' with name of cookie set by backend
    window.localStorage.removeItem('token');
    axiosMock.post.mockClear();
})

//TODO: insert unit tests to check validation functions correctly

test('email and password fields present', async () => {
    const { getByLabelText } = render(<Login />);
    // assertions
    expect(getByLabelText(/email/i)).toBeInTheDocument()
    expect(getByLabelText(/password/i)).toBeInTheDocument()
});

test('empty fields trigger validation', async () => {
    const { getByTestId, getByLabelText, getByText } = render(<Login />);

    // submit form 
    fireEvent.submit(getByTestId('form'));

    // assertions
    await waitFor(() => {
        expect(getByText(/email is required/i)).toBeInTheDocument()
    })
    await waitFor(() => {
        expect(getByText(/password is required/i)).toBeInTheDocument()
    })
});

test('login as an existing user', async () => {
    const { getByTestId, getByLabelText, getByText } = render(<Login />);

    // grab mock user data
    const mockUser = sample(mockUsers);

    // update values in form 
    fireEvent.change(getByLabelText(/email/i), { target: { value: mockUser.email } });
    fireEvent.change(getByLabelText(/password/i), { target: { value: 'fakePassword' } });

    // specify mocked data to be returned
    axiosMock.post.mockImplementationOnce(() => Promise.resolve({ data: mockUser }));

    // submit form 
    fireEvent.submit(getByTestId('form'));

    // assertions:
    // await redirect from /login to /services 
    await waitFor(() => {
        expect(window.location.href).toContain('services');
    })

    expect(axiosMock.post).toHaveBeenCalledTimes(1);
    // TODO: check cookie is set
})