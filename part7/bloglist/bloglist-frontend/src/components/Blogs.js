import React, { useEffect } from 'react'
import Blog from './Blog'
import { useSelector, useDispatch } from 'react-redux'
import { actionBlogs } from '../reducers/BlogReducer'
import blogService from '../services/blogs'

const Blogs = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blog)

  useEffect(() => {
    blogService.getAll().then(blogs => {
      dispatch(actionBlogs(blogs))
    })
  }, [])

  blogs.sort((a, b) => a.likes - b.likes)
  return (
    <div className="blogsContainer">
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}

    </div>
  )
}

export default Blogs