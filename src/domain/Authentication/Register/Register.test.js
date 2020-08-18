import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import Register from './Register';

test('empty name validation triggers correctly', async () => {
    const { getByText } = render(<Register />);

    expect(getByText(/name/i)).toBeInTheDocument();
    // fireEvent.click(getByText('Create Account'));

    // await waitFor(() => {
    //     expect(getByText('Please enter a name')).toBeInTheDocument()
    // })

    // expect(getByText('Please enter a name')).toBeInTheDocument();
});