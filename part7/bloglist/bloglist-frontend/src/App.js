import React from 'react'
import Home from './components/Home'
import Users from './components/Users'
import User from './components/User'
import Login from './components/Login'
import Userinfo from './components/Userinfo'
import { useSelector } from 'react-redux'

import { Switch, Route, Redirect } from 'react-router-dom'
import BlogInfo from './components/BlogInfo'

const App = () => {
  const user = useSelector(state => state.user)
  return (
    <div>
      <Userinfo/>
      <Switch>
        <Route path='/login' exact><Login/></Route>

        <Route path='/users' exact>
          {user ? <Users/> : <Redirect to="/login"/>}
        </Route>

        <Route path='/user/:id' exact>
          {user ? <User/> : <Redirect to="/login"/>}
        </Route>

        <Route path='/blog/:id' exact>
          {user ? <BlogInfo/> : <Redirect to="/login"/>}
        </Route>

        <Route path='/' exact>
          {user ? <Home/> : <Redirect to="/login"/>}
        </Route>
      </Switch>
    </div>
  )
}

export default App