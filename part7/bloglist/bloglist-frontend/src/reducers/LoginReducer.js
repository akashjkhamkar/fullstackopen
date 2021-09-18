const initialState = {
  username: '',
  password: ''
}

const reducer = (state = initialState, action) => {
  switch(action.type){
  case 'USERNAME':
    return { ...state, username: action.data.username }
  case 'PASSWORD':
    return { ...state, password: action.data.password }
  default: return state
  }
}

export const actionUsername = (username) => {
  return {
    type: 'USERNAME',
    data: {
      username
    }
  }
}

export const actionPassword = (password) => {
  return {
    type: 'PASSWORD',
    data: {
      password
    }
  }
}

export default reducer