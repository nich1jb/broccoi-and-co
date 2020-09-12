import * as React from 'react'
import ReactDOM from 'react-dom'
import { shallow } from 'enzyme'
import { cleanup } from '@testing-library/react'

import Dashboard from '.'

describe('Dashboard', () => {
  const setState = jest.fn()
  const useStateMock = (initState) => [initState, setState]

  afterEach(() => {
    jest.clearAllMocks()
    cleanup
  })

  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<Dashboard />, div)
  })

  it('matches snapshot', () => {
    const wrapper = shallow(<Dashboard />)
    expect(wrapper).toMatchSnapshot()
  })

  it('clicking button should open modal', ()=> {
    jest.spyOn(React, 'useState').mockImplementation(useStateMock)
    let wrapper = shallow(<Dashboard />)
    wrapper.find('Button').props().onClick()
    expect(setState).toHaveBeenCalledWith(true)
  })

  it('should close modal when close is called', () => {
    jest.spyOn(React, 'useState').mockImplementation((showModal) => [showModal=true, setState])
    const wrapper = shallow(<Dashboard />)
    wrapper.find('Modal').props().close()
    expect(setState).toHaveBeenCalledWith(false)
  })
})