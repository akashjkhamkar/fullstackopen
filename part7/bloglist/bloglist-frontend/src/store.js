import { createStore, combineReducers } from 'redux'

import LoginReducer from './reducers/LoginReducer'
import UserReducer from './reducers/UserReducer'
import NotificationReducer from './reducers/NotificationReducer'
import BlogReducer from './reducers/BlogReducer'

const reducer = combineReducers({
  login: LoginReducer,
  user: UserReducer,
  notification: NotificationReducer,
  blog: BlogReducer
})

const store = createStore(reducer)
store.subscribe(() => {
  console.log(store.getState())
})

export default store