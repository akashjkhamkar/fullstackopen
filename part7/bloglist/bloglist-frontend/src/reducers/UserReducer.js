const reducer = (state = null, action) => {
  switch(action.type){
  case 'USER_SET':
    return action.data.user
  case 'USER_RESET':
    return null
  default: return state
  }
}

export const actionUser = (user) => {
  return {
    type: 'USER_SET',
    data: {
      user
    }
  }
}

export const actionUserReset = () => {
  return {
    type: 'USER_RESET'
  }
}

export default reducer