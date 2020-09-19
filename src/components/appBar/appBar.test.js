import React from 'react';
import { render, cleanup } from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect";
import AppBar from '.';

afterEach(cleanup);

describe('AppBar', () => {
  it("matches snapshot for header", () => {
    const { asFragment } = render(<AppBar position='header' />);
    expect(asFragment()).toMatchSnapshot();
  });
  
  it("matches snapshot for footer", () => {
    const { asFragment } = render(<AppBar position='footer' />);
    expect(asFragment()).toMatchSnapshot();
  });
})