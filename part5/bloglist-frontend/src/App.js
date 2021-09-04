import React, { useState, useEffect, useRef } from 'react'
import Blogs from './components/Blogs'
import Create from './components/Create'
import Login from './components/Login'
import Userinfo from './components/Userinfo'
import Tooglable from './components/Tooglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [msg, setMsg] = useState('')

  const blogFormRef = useRef()

  const notification = (msg) => {
    setMsg(msg)
    setTimeout(() => {
      setMsg(null)
    }, 5000)
  }

  const addNewBlog = (blog) => {
    setBlogs(blogs.concat(blog))
    blogFormRef.current.toggleVisibility()
    notification(blog.title + ' by ' + blog.author + ' is added !')
  }

  const modifyBlog = (modifiedBlog) => {
    let newblogs = blogs.filter(blog => blog.id !== modifiedBlog.id)

    newblogs = newblogs.concat(modifiedBlog)
    setBlogs(newblogs)
  }

  const deleteBlog = (id) => {
    let newblogs = blogs.filter(blog => blog.id !== id)
    setBlogs(newblogs)
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    let loggeduser= {}

    try {
      loggeduser = await loginService.login(username, password)
    } catch (error) {
      notification('login failed')
      return
    }

    blogService.setToken(loggeduser.token)
    window.localStorage.setItem('loggedUser', JSON.stringify(loggeduser))
    setUser(loggeduser)
  }

  const handleLogout = () => {
    window.localStorage.clear()
    window.location.reload()
  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON)
      setUser(loggedUser)
      blogService.setToken(loggedUser.token)
    }
  }, [])

  if (!user) {
    return (
      <Login
        username={username}
        password={password}
        setUsername={setUsername}
        setPassword={setPassword}
        handleLogin={handleLogin}
        msg={msg}/>
    )
  }

  return (
    <div>
      <Userinfo user={user} handleLogout={handleLogout} msg={msg}/>
      <Tooglable buttonLabel={'Create'} ref={blogFormRef}>
        <Create addNewBlog={addNewBlog}/>
      </Tooglable>

      <Blogs blogs={blogs} modifyBlog={modifyBlog} deleteBlog={deleteBlog}/>

    </div>
  )
}

export default App