import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect";
import Dashboard from '.';

import 'mutationobserver-shim'
global.MutationObserver = window.MutationObserver

afterEach(cleanup);

describe('Dashboard', () => {
  it("matches snapshot", () => {
    const { asFragment } = render(<Dashboard />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders a title', () => {
    const { getByRole } = render(<Dashboard />)
    const title = getByRole('heading')
    expect(title.textContent).toBe('A better way to enjoy every day.')
  })

  it('clicking on the button will launch popup modal', () => {
    const { getByRole, getByText } = render(<Dashboard />)
    const button = getByRole('button')
    fireEvent.click(button)
    const modalTitle = getByText('Request an Invite')
    expect(modalTitle).toBeTruthy()
  })

  it('clicking outside modal will close it', () => {
    const { getByRole, queryByText } = render(<Dashboard />)
    const button = getByRole('button')
    fireEvent.click(button)
    const body = getByRole('generic', {name: 'modal-backdrop'})
    fireEvent.click(body)
    expect(queryByText('Request an Invite')).toBeNull()
  })
})