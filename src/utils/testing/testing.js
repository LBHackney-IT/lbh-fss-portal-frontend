import React from 'react';
import { render } from '@testing-library/react';
import UserContext from '../../context/UserContext/UserContext';
var mockUsers = require("../../../mock-api/mockUsers.json");
var sample = require("lodash/sample");

const mockUser = sample(mockUsers);

let fakeUser = {
    id: 1,
    name: 'fakeName',
    email: 'fakeEmail@example.com',
    organisation: { name: 'fakeOrganisation' },
    statuses: 'active'
}

function renderWithAccessPermissions(component) {
    fakeUser.roles = ['admin', 'viewer']
    const fakeUserWithPermissions = fakeUser
    render(
        <UserContext.Provider value={[fakeUserWithPermissions, null]}>
            {component}
        </UserContext.Provider>
    );
}

function renderWithoutAccessPermissions(component) {
    fakeUser.roles = ['vcso']
    const fakeUserWithoutPermissions = fakeUser
    render(
        <UserContext.Provider value={[fakeUserWithoutPermissions, null]}>
            {component}
        </UserContext.Provider>
    );
}

export {
    renderWithAccessPermissions,
    renderWithoutAccessPermissions,
    mockUser,
    mockUsers
}