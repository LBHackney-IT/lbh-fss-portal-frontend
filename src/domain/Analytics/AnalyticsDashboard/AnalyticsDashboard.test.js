import React from 'react';
import { screen } from '@testing-library/react';
import AnalyticsDashboard from './AnalyticsDashboard';
import {
    renderWithAccessPermissions,
    renderWithoutAccessPermissions
} from '../../../utils/testing/testing'

test('get total number of services if user has permissions', async () => {
    renderWithAccessPermissions(<AnalyticsDashboard />)
    const servicesText = await screen.findByText('Total number of services')
    expect(servicesText).toBeInTheDocument()
})

test('get number of submitted services if user has permissions', async () => {
    renderWithAccessPermissions(<AnalyticsDashboard />)
    const servicesText = await screen.findByText('Number of services submitted')
    expect(servicesText).toBeInTheDocument()
})

test('get number of services approved if user has permissions', async () => {
    renderWithAccessPermissions(<AnalyticsDashboard />)
    const servicesText = await screen.findByText('Number of services approved')
    expect(servicesText).toBeInTheDocument()
})

test('get number of services waiting approval if user has permissions', async () => {
    renderWithAccessPermissions(<AnalyticsDashboard />)
    const servicesText = await screen.findByText('Currently number of services waiting approval')
    expect(servicesText).toBeInTheDocument()
})

test('get access denied if user does not have permissions', async () => {
    renderWithoutAccessPermissions(<AnalyticsDashboard />)
    const accessDeniedText = await screen.findByText('Access Denied')
    expect(accessDeniedText).toBeInTheDocument()
})
