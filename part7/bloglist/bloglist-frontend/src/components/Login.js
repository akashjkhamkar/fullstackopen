import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { actionUsername, actionPassword } from '../reducers/LoginReducer'
import { actionUser } from '../reducers/UserReducer'

import loginService from '../services/login'
import blogService from '../services/blogs'
import { notify } from '../reducers/NotificationReducer'

const Login = () => {
  const dispatch = useDispatch()
  const username = useSelector(state => state.login.username)
  const password = useSelector(state => state.login.password)
  const msg = useSelector(state => state.notification)
  const user = useSelector(state => state.user)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON)
      dispatch(actionUser(loggedUser))
      blogService.setToken(loggedUser.token)
    }
  }, [])

  if(user){
    return null
  }

  // check for the logged user
  const handleLogin = async (e) => {
    e.preventDefault()
    let loggeduser = null

    try {
      loggeduser = await loginService.login(username, password)
    } catch (error) {
      notify(dispatch, 'login failed')
      return
    }

    dispatch(actionUser(loggeduser))
    blogService.setToken(loggeduser.token)
    window.localStorage.setItem('loggedUser', JSON.stringify(loggeduser))
  }

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
            onChange={({ target }) => dispatch(actionUsername(target.value))}/>
        </div>

        <div>
                    password
          <input
            type="password"
            id="password"
            value={password}
            name="password"
            onChange={({ target }) => dispatch(actionPassword(target.value))}/>
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default Login