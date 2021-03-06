import { createStore, combineReducers } from 'redux'

import LoginReducer from './reducers/LoginReducer'
import UserReducer from './reducers/UserReducer'
import UsersReducer from './reducers/UsersReducer'
import NotificationReducer from './reducers/NotificationReducer'
import BlogReducer from './reducers/BlogReducer'

const reducer = combineReducers({
  login: LoginReducer,
  user: UserReducer,
  users: UsersReducer,
  notification: NotificationReducer,
  blog: BlogReducer
})

const store = createStore(reducer)

export default store