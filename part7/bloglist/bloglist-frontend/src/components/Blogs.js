import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { actionBlogs } from '../reducers/BlogReducer'
import blogService from '../services/blogs'
import { Link } from 'react-router-dom'

const Blogs = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blog)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  useEffect(() => {
    blogService.getAll().then(blogs => {
      dispatch(actionBlogs(blogs))
    })
  }, [])

  blogs.sort((a, b) => a.likes - b.likes)
  return (
    <div className="blogsContainer">
      {blogs.map(blog =>
        <div style={blogStyle} key={blog.id}>
          <Link to={`/blog/${blog.id}`}>
            {blog.title}
          </Link>
        </div>
      )}

    </div>
  )
}

export default Blogs