import React from 'react'
import Home from './components/Home'
import Users from './components/Users'
import User from './components/User'
import Login from './components/Login'
import Userinfo from './components/Userinfo'
import { useSelector } from 'react-redux'

import { Switch, Route } from 'react-router-dom'
import BlogInfo from './components/BlogInfo'

import { Container } from 'react-bootstrap'

const App = () => {
  const user = useSelector(state => state.user)

  if(!user){
    return <Login/>
  }

  return (
    <Container>
      <Userinfo/>
      <Switch>
        <Route path='/users' exact>
          <Users/>
        </Route>

        <Route path='/user/:id' exact>
          <User/>
        </Route>

        <Route path='/blog/:id' exact>
          <BlogInfo/>
        </Route>

        <Route path='/' exact>
          <Home/>
        </Route>
      </Switch>
    </Container>
  )
}

export default App