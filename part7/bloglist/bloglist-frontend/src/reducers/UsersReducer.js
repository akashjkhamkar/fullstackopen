const reducer = (state = [], action) => {
  switch(action.type){
  case 'USERS_SET':
    return action.data.users
  case 'USERS_RESET':
    return null
  default: return state
  }
}

export const actionUsers = (users) => {
  return {
    type: 'USERS_SET',
    data: {
      users
    }
  }
}

export const actionUsersReset = () => {
  return {
    type: 'USERS_RESET'
  }
}

export default reducer