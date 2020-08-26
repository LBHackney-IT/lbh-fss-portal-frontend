import React from 'react';
import { screen } from '@testing-library/react';
import ListUsers from './ListUsers';
import {
    renderWithAccessPermissions,
    renderWithoutAccessPermissions
} from '../../../utils/testing/testing'

test('get list users page if user has permissions', async () => {
    renderWithAccessPermissions(<ListUsers />)
    const heading = await screen.findByRole('heading')
    expect(heading).toHaveTextContent('Users')
    expect(heading).not.toHaveTextContent('Access Denied')
})

test('get access denied if user does not have permissions', async () => {
    renderWithoutAccessPermissions(<ListUsers />)
    const heading = await screen.findByRole('heading')
    expect(heading).toHaveTextContent('Access Denied')
    expect(heading).not.toHaveTextContent('Users')
})
