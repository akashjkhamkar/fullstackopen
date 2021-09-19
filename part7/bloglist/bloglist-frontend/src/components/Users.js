import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import usersService from '../services/users'
import { actionUsers } from '../reducers/UsersReducer'
import { Link } from 'react-router-dom'

const Users = () => {
  const dispatch = useDispatch()
  const users = useSelector(state => state.users)

  useEffect(() => {
    usersService.getAll()
      .then(res => dispatch(actionUsers(res)))
  }, [])

  console.log(users)
  return(
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <td>

            </td>
            <td>
              <h3>blogs created</h3>
            </td>
          </tr>
        </thead>
        <tbody>
          {users.map(user =>
            <tr key={user.id}>
              <td>
                <Link to={`/user/${user.id}`}>
                  {user.name}
                </Link>
              </td>
              <td>
                {user.blogs.length}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Users