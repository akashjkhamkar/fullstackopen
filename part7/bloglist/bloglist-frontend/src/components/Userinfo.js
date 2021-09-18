import React from 'react'
import { useSelector } from 'react-redux'

const Userinfo = () => {
  const msg = useSelector(state => state.notification)
  const handleLogout = () => {
    window.localStorage.clear()
    window.location.reload()
  }

  const user = useSelector(state => state.user)
  return (
    <div>
      <h2>blogs</h2>
      {msg} <br/>
      {user.username} logged in
      <button onClick={handleLogout}>logout</button>
    </div>
  )
}

export default Userinfo