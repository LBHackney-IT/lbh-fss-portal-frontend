import React from 'react';
import { render, screen } from '@testing-library/react';
import ProtectedLayout from './ProtectedLayout';
import UserContext from '../../context/UserContext/UserContext';


let fakeUser = {
    id: 1,
    name: 'fakeName',
    email: 'fakeEmail@example.com',
    organisation: { name: 'fakeOrganisation' },
    statuses: 'active'
}

function renderWithPermissions() {
    fakeUser.roles = ['hackney_admin', 'hackney_viewer']
    const fakeUserWithPermissions = fakeUser
    render(
        <UserContext.Provider value={[fakeUserWithPermissions, null]}>
            <ProtectedLayout />
        </UserContext.Provider>
    );
}

function renderWithoutPermissions() {
    fakeUser.roles = ['vsco_contributer']
    const fakeUserWithoutPermissions = fakeUser
    render(
        <UserContext.Provider value={[fakeUserWithoutPermissions, null]}>
            <ProtectedLayout />
        </UserContext.Provider>
    );
}

// 
test('"users" menu link does appear for users with permissions', async () => {
    renderWithPermissions()
    const menuLinks = await screen.findByRole('navigation')
    expect(menuLinks).toHaveTextContent('Users')
})

test('"analytics" menu link does appear for users with permissions', async () => {
    renderWithPermissions()
    const menuLinks = await screen.findByRole('navigation')
    expect(menuLinks).toHaveTextContent('Analytics')
})

test('"users" menu link does not appear for users without permissions', async () => {
    renderWithoutPermissions()
    const menuLinks = await screen.findByRole('navigation')
    expect(menuLinks).not.toHaveTextContent('Users')

})

test('"analytics" menu link does not appear for users without permissions', async () => {
    renderWithoutPermissions()
    const menuLinks = await screen.findByRole('navigation')
    expect(menuLinks).not.toHaveTextContent('Analytics')
})
