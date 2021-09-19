import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { actionUserReset } from '../reducers/UserReducer'
import { Link } from 'react-router-dom'

import { Button, Navbar, Nav, Container, Alert } from 'react-bootstrap'

const Userinfo = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const msg = useSelector(state => state.notification)
  const alert = msg ? <Alert variant="success">{msg}</Alert> : null

  const handleLogout = () => {
    window.localStorage.clear()
    dispatch(actionUserReset())
    history.push('/login')
  }

  const user = useSelector(state => state.user)

  if(!user){
    return null
  }

  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand>
            <Link to="/">Blogs app</Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link>
                <Link to="/users">users</Link>
              </Nav.Link>
              <Nav.Link>
                {user.username} logged in
              </Nav.Link>
              <Button size="sm" variant="outline-dark" onClick={handleLogout}> logout</Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {alert}
    </div>
  )
}

export default Userinfo