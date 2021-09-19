import React, { useRef } from 'react'
import Blogs from './Blogs'
import Create from './Create'
import Tooglable from './Tooglable'

const Home = () => {
  const blogFormRef = useRef()
  return  (
    <>
      <Tooglable buttonLabel={'Create'} ref={blogFormRef}>
        <Create blogFormRef={blogFormRef}/>
      </Tooglable>
      <Blogs/>
    </>)
}

export default Home