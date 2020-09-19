import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { act } from 'react-dom/test-utils'
import "@testing-library/jest-dom/extend-expect";
import Modal from '.';

import 'mutationobserver-shim'
global.MutationObserver = window.MutationObserver

afterEach(cleanup);

describe('Modal', () => {
  it("matches snapshot", () => {
    const { asFragment } = render(<Modal />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should display inline errors', async () => {
    const { getByRole, getByText, queryByText } = render(<Modal />)
    const nameField = getByRole('textbox', {name: 'name'})
    fireEvent.input(nameField, {target: {value: 'P'}})
    const emailField = getByRole('textbox', {name: 'email'})
    fireEvent.input(emailField, {target: {value: 'invlaid email'}})
    const emailConfirmField = getByRole('textbox', {name: 'email confirm'})
    fireEvent.input(emailConfirmField, {target: {value: 'peter.parker@dailybugle.com'}})

    await act(async () =>  {
      const submitButton = getByText('Send')
      fireEvent.click(submitButton)
    })

    expect(queryByText('Name must have at least 3 characters')).toBeTruthy()
    expect(queryByText('Must be a valid email address')).toBeTruthy()
    expect(queryByText('Emails must match')).toBeTruthy()
  })

  it('should render success message on successful submit', async () => {
    const mock = new MockAdapter(axios)
    mock.onPost('https://l94wc2001h.execute-api.ap-southeast-2.amazonaws.com/prod/fake-auth').reply(200, 'Registered')

    const { getByRole, getByText, queryByText } = render(<Modal />)
    const nameField = getByRole('textbox', {name: 'name'})
    fireEvent.input(nameField, {target: {value: 'Peter Parker'}})
    const emailField = getByRole('textbox', {name: 'email'})
    fireEvent.input(emailField, {target: {value: 'peter.parker@dailybugle.com'}})
    const emailConfirmField = getByRole('textbox', {name: 'email confirm'})
    fireEvent.input(emailConfirmField, {target: {value: 'peter.parker@dailybugle.com'}})

    await act(async () =>  {
      const submitButton = getByText('Send')
      fireEvent.click(submitButton)
    })
    expect(queryByText('You will be the first to experience Broccoli & Co. when we launch.')).toBeTruthy()
  })

  it('should not render success message on unsuccessful submit', async () => {
    const mock = new MockAdapter(axios)
    mock.onPost('https://l94wc2001h.execute-api.ap-southeast-2.amazonaws.com/prod/fake-auth').reply(200, 'error')

    const { getByRole, getByText, queryByText } = render(<Modal />)
    const nameField = getByRole('textbox', {name: 'name'})
    fireEvent.input(nameField, {target: {value: 'Peter Parker'}})
    const emailField = getByRole('textbox', {name: 'email'})
    fireEvent.input(emailField, {target: {value: 'peter.parker@dailybugle.com'}})
    const emailConfirmField = getByRole('textbox', {name: 'email confirm'})
    fireEvent.input(emailConfirmField, {target: {value: 'peter.parker@dailybugle.com'}})

    await act(async () =>  {
      const submitButton = getByText('Send')
      fireEvent.click(submitButton)
    })
    expect(queryByText('You will be the first to experience Broccoli & Co. when we launch.')).toBeNull()
  })

  it('should render server error on failed api call', async () => {
    const mock = new MockAdapter(axios)
    mock.onPost('https://l94wc2001h.execute-api.ap-southeast-2.amazonaws.com/prod/fake-auth').reply(400, { errorMessage: 'Email address in use' })

    const { getByRole, getByText, queryByText } = render(<Modal />)
    const nameField = getByRole('textbox', {name: 'name'})
    fireEvent.input(nameField, {target: {value: 'Peter Parker'}})
    const emailField = getByRole('textbox', {name: 'email'})
    fireEvent.input(emailField, {target: {value: 'peter.parker@dailybugle.com'}})
    const emailConfirmField = getByRole('textbox', {name: 'email confirm'})
    fireEvent.input(emailConfirmField, {target: {value: 'peter.parker@dailybugle.com'}})

    await act(async () =>  {
      const submitButton = getByText('Send')
      fireEvent.click(submitButton)
    })
    expect(queryByText('Email address in use')).toBeTruthy()
  })

})