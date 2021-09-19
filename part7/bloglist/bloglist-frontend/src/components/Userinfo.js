import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { actionUserReset } from '../reducers/UserReducer'
import { Link } from 'react-router-dom'

const Userinfo = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const msg = useSelector(state => state.notification)

  const padding = {
    padding: 5
  }

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
      <div>
        <Link style={padding} to="/"> blogs </Link>
        <Link style={padding} to="/users"> users </Link>
        {user.username} logged in
        <button onClick={handleLogout}>logout</button>
      </div>
      {msg} <br/>
      <h2>blogs</h2>
    </div>
  )
}

export default Userinfo