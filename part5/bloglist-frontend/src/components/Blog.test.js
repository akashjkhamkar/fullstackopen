import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'


describe('<Togglable />', () => {
  let component
  let ablog = {
    title: 'harry potter',
    author: 'jk',
    likes: 69,
    user:{ username:'ron' }
  }
  const modifyblog = jest.fn()
  const deleteblog = jest.fn()

  beforeEach(() => {
    component = render(
      <Blog blog={ablog}
        modifyBlog={modifyblog}
        deleteBlog={deleteblog}
      />
    )
  })

  test('at start the children are not displayed', () => {
    const visible = component.container.querySelector('.visible')
    const hidden = component.container.querySelector('.hidden')

    expect(visible).toHaveStyle('display: block')
    expect(hidden).toHaveStyle('display: none')
  })

  test('after clicking the button, children are displayed', () => {
    const button = component.container.querySelector('.show')
    fireEvent.click(button)

    const hidden = component.container.querySelector('.hidden')
    expect(hidden).toHaveStyle('display: block')
  })

})
