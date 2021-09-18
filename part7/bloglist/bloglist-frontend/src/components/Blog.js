import React, { useState } from 'react'
import blogService from '../services/blogs'

import { useDispatch } from 'react-redux'
import { actionModifyBlogs, actionDeletedBlog } from '../reducers/BlogReducer'

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false)
  const dispatch = useDispatch()

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const handleLike = async (e) => {
    e.preventDefault()
    blog.likes+=1
    const res = await blogService.updateBlog(blog)
    dispatch(actionModifyBlogs(res))
  }

  const handleDelete = async (e) => {
    e.preventDefault()
    if(!window.confirm(`are you sure ? deleting ${blog.title}`)){
      return
    }
    await blogService.deleteBlog(blog.id)
    dispatch(actionDeletedBlog(blog.id))
  }

  const visibility = { display: visible ? '' : 'none' }

  return (
    <div style={blogStyle} className="visible">
      <div>

        <span className="title">
          {blog.title}
        </span>

        <span className="author">
          {blog.author}
        </span>

        <button onClick={toggleVisibility} className="show">show/hide</button>

      </div>
      <div style={visibility} className="hidden">
        <div>
          <span id="likes">
            {blog.likes}
          </span>
          <button onClick={handleLike}>like</button>
        </div>
        <div>
          {blog.url}
        </div>
        <div>
          {blog.user.username}
        </div>
      </div>
      <button onClick={handleDelete}>Delete</button>
    </div>
  )}

export default Blog