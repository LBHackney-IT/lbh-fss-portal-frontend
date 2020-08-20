import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react';
import axiosMock from 'axios';
import App from '../../../App'
var mockUsers = require("../../../../mock-api/users/mockUsers.json");
var sample = require("lodash/sample");

beforeEach(() => {
    axiosMock.get.mockClear();
})

// grab mock user data
const mockUser = sample(mockUsers);

test('Logout redirects to Login page', async () => {
    // mock user data 
    axiosMock.get.mockImplementationOnce(() => Promise.resolve({ data: mockUser }));

    // render App
    const { getByText, queryByRole, findByText } = render(<App />)

    // wait for log out button to render 
    await findByText(/log out/i)

    // click log out button 
    fireEvent.click(getByText(/log out/i));

    // check user is directed to /logout page
    expect(window.location.pathname).toEqual('/logout');


    // check user is redirected from logout page to login page
    await waitFor(() => {
        expect(queryByRole('heading', { name: /login/i })).not.toBeNull()
    })
    expect(window.location.pathname).toEqual('/');
})
