import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

jest.mock("./hooks", () => ({
  useAppSelector: jest.fn(),
  useAppDispatch: jest.fn()
}));

test('renders correctly', () => {
  render(<App />);
  const pageTitle = screen.getByText('iTunes Search App');
  expect(pageTitle).toBeInTheDocument();
});

