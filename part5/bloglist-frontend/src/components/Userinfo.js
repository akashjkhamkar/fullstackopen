import React from 'react'

const Userinfo = ({ user, handleLogout, msg }) => {
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