import React from 'react';
import { render, screen } from '@testing-library/react';
import ProtectedLayout from './ProtectedLayout';
import UserContext from '../../context/UserContext/UserContext';
import {
    renderWithAccessPermissions,
    renderWithoutAccessPermissions
} from '../../utils/testing/testing'


test('"users" menu link does appear for users with permissions', async () => {
    renderWithAccessPermissions(<ProtectedLayout />)
    const menuLinks = await screen.findByRole('navigation')
    expect(menuLinks).toHaveTextContent('Users')
})

test('"analytics" menu link does appear for users with permissions', async () => {
    renderWithAccessPermissions(<ProtectedLayout />)
    const menuLinks = await screen.findByRole('navigation')
    expect(menuLinks).toHaveTextContent('Analytics')
})

test('"users" menu link does not appear for users without permissions', async () => {
    renderWithoutAccessPermissions(<ProtectedLayout />)
    const menuLinks = await screen.findByRole('navigation')
    expect(menuLinks).not.toHaveTextContent('Users')
})

test('"analytics" menu link does not appear for users without permissions', async () => {
    renderWithoutAccessPermissions(<ProtectedLayout />)
    const menuLinks = await screen.findByRole('navigation')
    expect(menuLinks).not.toHaveTextContent('Analytics')
})
