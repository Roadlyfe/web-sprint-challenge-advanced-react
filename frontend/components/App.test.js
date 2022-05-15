import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import AppClass from './AppClass'
// Write your tests here


test("AppClass renders without errors", () => {
  render(<AppClass />) 
})

test('renders the AppClass header', () => {
  render(<AppClass />)

  const header = screen.queryByText(/Welcome to the GRID/i);
  expect(header).toBeInTheDocument;
});

test('renders the AppClass coordinates', () => {
  render(<AppClass />)

  const coordinates = screen.queryByText(/Coordinates/i);
  expect(coordinates).toBeInTheDocument;
});

test('renders the AppClass submit button', () => {
  render(<AppClass />)

  const submitButton = screen.queryByText(/submit/i);
  expect(submitButton).toBeInTheDocument;
});

test('renders the total moves', () => {
  render(<AppClass />)

  const totalMoves = screen.queryByText(/You moved/i);
  expect(totalMoves).toBeInTheDocument;
});