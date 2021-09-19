import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { actionAdd } from '../reducers/BlogReducer'
import { notify } from '../reducers/NotificationReducer'
import blogService from '../services/blogs'

import { Button, Form } from 'react-bootstrap'

const Create = (blogFormRef) => {
  const dispatch = useDispatch()

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleNewBlog = async (e) => {
    e.preventDefault()
    const newb = await blogService.addBlog(title, author, url)
    dispatch(actionAdd(newb))

    blogFormRef.blogFormRef.current.toggleVisibility()

    notify(dispatch, title + ' by ' + author + ' is added !')
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <Form onSubmit={handleNewBlog}>
        <h2>Create new</h2>
        <Form.Group>
          <Form.Label>title:</Form.Label>
          <Form.Control
            type="text"
            id="title"
            value={title}
            name="title"
            onChange={({ target }) => setTitle(target.value)}/>
        </Form.Group>

        <Form.Group>
          <Form.Label>author:</Form.Label>
          <Form.Control
            type="text"
            id="author"
            value={author}
            name="author"
            onChange={({ target }) => setAuthor(target.value)}/>
        </Form.Group>

        <Form.Group>
          <Form.Label>url:</Form.Label>
          <Form.Control
            type="text"
            id="url"
            value={url}
            name="url"
            onChange={({ target }) => setUrl(target.value)}/>
        </Form.Group>

        <Button style={{ margin: '5px' }} variant="outline-dark" type="submit">create</Button>

      </Form>
    </div>
  )
}

export default Create