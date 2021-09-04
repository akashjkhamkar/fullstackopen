import React from 'react'
import Blog from './Blog'
const Blogs = ({ blogs, modifyBlog, deleteBlog }) => {
  blogs.sort((a, b) => a.likes - b.likes)
  return (
    <div className="blogsContainer">
      {blogs.map(blog =>
        <Blog deleteBlog={deleteBlog} modifyBlog={modifyBlog} key={blog.id} blog={blog} />
      )}

    </div>
  )
}

export default Blogs