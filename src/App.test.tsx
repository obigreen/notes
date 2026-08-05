import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

test('renders Notes application', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );

  expect(screen.getByRole('heading', { name: 'Notes' })).toBeInTheDocument();
});

test('renders function fundamentals on the Functions page', () => {
  render(
    <MemoryRouter initialEntries={['/js-functions']}>
      <App />
    </MemoryRouter>
  );

  expect(screen.getByText('Function value / function call')).toBeInTheDocument();
  expect(screen.getByText('Parameters / arguments')).toBeInTheDocument();
  expect(screen.getByText('Return function / Closure')).toBeInTheDocument();
});
