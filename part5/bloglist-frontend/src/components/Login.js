import React from 'react'
const Login = ({ username, password, setUsername, setPassword, handleLogin, msg }) => {
  return (
    <div>
      <h2>Log in to application</h2>
      {msg}
      <form onSubmit={handleLogin}>
        <div>
                    username
          <input
            type="text"
            id="username"
            value={username}
            name="username"
            onChange={({ target }) => setUsername(target.value)}/>
        </div>

        <div>
                    password
          <input
            type="password"
            id="password"
            value={password}
            name="password"
            onChange={({ target }) => setPassword(target.value)}/>
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default Login