import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import Blog from './Blog'

const BlogInfo = () => {
  const id = useParams().id
  const blogs = useSelector(state => state.blog)
  const blog = blogs.find(u => u.id === id)

  return <Blog blog={blog}/>
}

export default BlogInfo