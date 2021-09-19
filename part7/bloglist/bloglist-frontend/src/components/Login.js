import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { actionUsername, actionPassword } from '../reducers/LoginReducer'
import { actionUser } from '../reducers/UserReducer'

import loginService from '../services/login'
import blogService from '../services/blogs'
import { notify } from '../reducers/NotificationReducer'

import { useHistory } from 'react-router-dom'

import { Container, Form, Button, Alert } from 'react-bootstrap'

const Login = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const username = useSelector(state => state.login.username)
  const password = useSelector(state => state.login.password)
  const msg = useSelector(state => state.notification)

  const alert = msg ? <Alert variant="danger">{msg}</Alert> : null

  // check for the logged user
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON)
      dispatch(actionUser(loggedUser))
      blogService.setToken(loggedUser.token)
      history.push('/')
    }
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault()
    let loggeduser = null

    try {
      loggeduser = await loginService.login(username, password)
    } catch (error) {
      notify(dispatch, 'login failed , check credentials again, if you dont have an account , contact the dev , as we dont have a sign up page yet')
      return
    }

    dispatch(actionUser(loggeduser))
    blogService.setToken(loggeduser.token)
    window.localStorage.setItem('loggedUser', JSON.stringify(loggeduser))
    history.push('/')
  }

  return (
    <Container style={{ width:'60%' }}>
      <h2>Log in to application</h2>
      {alert}
      <Form onSubmit={handleLogin}>
        <Form.Label>
          username
        </Form.Label>
        <Form.Control
          type="text"
          id="username"
          value={username}
          name="username"
          onChange={({ target }) => dispatch(actionUsername(target.value))}/>

        <Form.Label>
          password
        </Form.Label>
        <Form.Control
          type="password"
          id="password"
          value={password}
          name="password"
          onChange={({ target }) => dispatch(actionPassword(target.value))}/>

        <Button style={{ margin:'3px' }} type="submit">login</Button>
      </Form>
    </Container>
  )
}

export default Login