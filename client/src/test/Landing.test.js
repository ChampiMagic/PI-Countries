import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App.js';
import { render } from '@testing-library/react';
import "@testing-library/jest-dom";


it.only('renders button correctly', () => {
  const { getByTestId } = render(<App/>)
  expect(getByTestId('landing_button')).toHaveTextContent('TAKE OFF')
})
