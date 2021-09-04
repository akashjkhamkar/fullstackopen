import React, { useState } from 'react'
import blogService from '../services/blogs'

const Create = ({ addNewBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')


  const handleNewBlog = async (e) => {
    e.preventDefault()
    const res = await blogService.addBlog(title, author, url)
    addNewBlog(res)
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>Create new</h2>
      <form onSubmit={handleNewBlog}>
        <div>
                    title:
          <input
            type="text"
            id="title"
            value={title}
            name="title"
            onChange={({ target }) => setTitle(target.value)}/>
        </div>

        <div>
                    author:
          <input
            type="text"
            id="author"
            value={author}
            name="author"
            onChange={({ target }) => setAuthor(target.value)}/>
        </div>

        <div>
                    url:
          <input
            type="text"
            id="url"
            value={url}
            name="url"
            onChange={({ target }) => setUrl(target.value)}/>
        </div>

        <button type="submit">create</button>

      </form>
    </div>
  )
}

export default Create