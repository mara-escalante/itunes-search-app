import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders correctly', () => {
  render(<App />);
  const pageTitle = screen.getByText('ITunes Search');
  expect(pageTitle).toBeInTheDocument();
});

