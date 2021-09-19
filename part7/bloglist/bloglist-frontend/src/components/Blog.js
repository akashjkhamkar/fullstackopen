import React from 'react'
import blogService from '../services/blogs'

import { useDispatch } from 'react-redux'
import { actionModifyBlogs, actionDeletedBlog } from '../reducers/BlogReducer'
import { useHistory } from 'react-router-dom'

function getRandomInt(max) {
  return Math.floor(Math.random() * max)
}

const Blog = ({ blog }) => {
  const dispatch = useDispatch()
  const history = useHistory()

  if(!blog){
    return null
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const handleLike = async (e) => {
    e.preventDefault()
    const res = await blogService.likeBlog(blog.id)
    dispatch(actionModifyBlogs(res))
  }

  const handleDelete = async (e) => {
    e.preventDefault()
    if(!window.confirm(`are you sure ? deleting ${blog.title}`)){
      return
    }
    await blogService.deleteBlog(blog.id)
    dispatch(actionDeletedBlog(blog.id))
    history.push('/')
  }

  const handleComment = async (e) => {
    e.preventDefault()
    const res = await blogService.commentBlog(blog.id, e.target.comment.value)
    e.target.comment.value = ''
    dispatch(actionModifyBlogs(res))
  }


  return (
    <div style={blogStyle}>
      <div>

        <h1 className="title">
          {blog.title}
        </h1>

        <span className="author">
          {blog.author}
        </span>

        <div>
          <span id="likes">
            {blog.likes} likes
          </span>
          <button onClick={handleLike}>like</button>
        </div>

        <a href={blog.url}>
          {blog.url}
        </a>

        <div>added by
          {' ' + blog.user.username}
        </div>

      </div>
      <button onClick={handleDelete}>Delete</button>

      <div>
        <h2>comments</h2>
        <form onSubmit={handleComment}>
          <input name="comment" type="text" required placeholder={'comment here'}/>
          <button>submit</button>
        </form>
        <ul>
          {blog.comments.map(comment =>
            <li key={getRandomInt(100)+comment}>{comment}</li>)}
        </ul>
      </div>
    </div>
  )}

export default Blog