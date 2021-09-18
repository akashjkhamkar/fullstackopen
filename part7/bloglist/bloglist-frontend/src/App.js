import React, { useRef } from 'react'
import Blogs from './components/Blogs'
import Create from './components/Create'
import Login from './components/Login'
import Userinfo from './components/Userinfo'
import Tooglable from './components/Tooglable'
import Main from './components/Main'

const App = () => {
  const blogFormRef = useRef()
  return (
    <div>
      <Login/>
      <Main>
        <Userinfo/>
        <Tooglable buttonLabel={'Create'} ref={blogFormRef}>
          <Create blogFormRef={blogFormRef}/>
        </Tooglable>
        <Blogs/>
      </Main>
    </div>
  )
}

export default App