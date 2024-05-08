import React from 'react';
// import ReactDOM from 'react-dom';
import AppMain from './App';
import { render } from '@testing-library/react';

it('renders without crashing', () => {
  const div = document.createElement('div');
  render(<AppMain />, div);
});