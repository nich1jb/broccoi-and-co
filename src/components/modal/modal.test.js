import * as React from 'react'
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { act } from 'react-dom/test-utils'
import { shallow, mount } from 'enzyme'
import { cleanup } from '@testing-library/react'

import 'mutationobserver-shim'
global.MutationObserver = window.MutationObserver

import Modal from '.'

describe('Modal', () => {
  const setState = jest.fn()
  const useStateMock = (initState) => [initState, setState]

  afterEach(() => {
    jest.clearAllMocks()
    cleanup
  })

  it('matches snapshot', () => {
    const wrapper = shallow(<Modal />)
    expect(wrapper).toMatchSnapshot()
  })

  it('error messages for all fields should display if nothing is filled in', async () => {
    const wrapper = mount(<Modal />)
    await act(async () => {
      wrapper.find('form').simulate('submit')
    });
    act(() => {
      const formText = wrapper.text()
      expect(formText).toMatch('Name is required')
      expect(formText).toMatch('Email is required')
      expect(formText).toMatch('Confrimation email is required')
    });
  })

  it('should set submit user info sucessfully', () => {
    jest.spyOn(React, 'useState').mockImplementation(useStateMock)
    const mock = new MockAdapter(axios)
    mock.onPost('https://l94wc2001h.execute-api.ap-southeast-2.amazonaws.com/prod/fake-auth').reply(200, 'Registered')
    let wrapper = shallow(<Modal />)
    wrapper.find('form').props().onSubmit()
    expect(setState).toHaveBeenCalledWith(true)
  })

  it('should set error message when api call fails', async () => {
    jest.spyOn(React, 'useState').mockImplementation(useStateMock)
    const mock = new MockAdapter(axios)
    const data = { errorMessage: 'Email address in use' }
    mock.onPost('https://l94wc2001h.execute-api.ap-southeast-2.amazonaws.com/prod/fake-auth').reply(400, data)
    let wrapper = shallow(<Modal />)
    await act(async () => {
      wrapper.find('form').props().onSubmit()
    });
    act(() => {
      expect(setState).toHaveBeenCalledWith('Email address in use')
    })
  })

  it('matches snapshot for submitted screen', () => {
    jest.spyOn(React, 'useState').mockImplementation((submitted) => [submitted=true, setState])
    const wrapper = shallow(<Modal />)
    expect(wrapper).toMatchSnapshot()
  })
})