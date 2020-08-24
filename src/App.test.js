import React from 'react';
import { render, waitFor } from '@testing-library/react';
import App from './App';

test('renders learn react link', async () => {
  const { getByText } = render(<App />);

  await waitFor(() => {
    expect(getByText(/hackney/i)).toBeInTheDocument();
  })
});
