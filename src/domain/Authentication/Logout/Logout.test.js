import React from 'react'
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
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
    // mock user data (so as to authenticate)
    axiosMock.get.mockImplementationOnce(() => Promise.resolve({ data: mockUser }));

    // render App
    render(<App />)

    // wait for log out button to render 
    await screen.findByText(/log out/i)

    // click log out button 
    fireEvent.click(screen.getByText(/log out/i));

    // check user is directed to /logout page
    expect(window.location.pathname).toEqual('/logout');

    // check user is redirected from logout page to login page
    const loginHeader = await screen.findByRole('heading', { name: /login/i })
    expect(loginHeader).not.toBeNull()
    expect(window.location.pathname).toEqual('/');
})
