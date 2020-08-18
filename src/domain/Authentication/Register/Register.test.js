import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import Register from './Register';
import { repeat } from 'lodash';

test('empty name validation triggers correctly', async () => {
    const { getByText } = render(<Register />);

    fireEvent.click(getByText('Create Account'));

    await waitFor(() => {
        expect(getByText(/Please enter a name/i)).toBeInTheDocument()
    })
});

test('maximum name length validation triggers correctly', async () => {
    const { getByText, getByLabelText } = render(<Register />);

    const longName = repeat("ben", 100);

    fireEvent.change(getByLabelText(/name/i), { target: { value: longName } })

    fireEvent.click(getByText('Create Account'));

    await waitFor(() => {
        expect(getByText(/Maximum length is 255 characters/i)).toBeInTheDocument()
    })
});



