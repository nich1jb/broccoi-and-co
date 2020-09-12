import React from 'react'
import ReactDOM from 'react-dom'
import { shallow } from 'enzyme'
import { cleanup } from '@testing-library/react'

import AppBar from '.'

describe('AppBar', () => {
  afterEach(cleanup)

  it('renders header without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<AppBar position='header' />, div)
  })

  it('renders footer without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<AppBar position='footer' />, div)
  })

  it('matches snapshot for header', () => {
    const wrapper = shallow(<AppBar position='header' />)
    expect(wrapper).toMatchSnapshot()
  })

  it('matches snapshot for footer', () => {
    const wrapper = shallow(<AppBar position='footer' />)
    expect(wrapper).toMatchSnapshot()
  })
})