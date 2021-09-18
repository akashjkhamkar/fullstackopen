const reducer = (state = '', action) => {
  switch(action.type){
  case 'SET_MSG':
    return action.data.msg
  case 'RESET_MSG':
    return null
  default:
    return state
  }
}

let id = null
export const notify = (dispatch, msg) => {
  if(id){
    clearTimeout(id)
  }
  dispatch(ActionMsg(msg))
  id = setTimeout(() => {
    dispatch(ResetMsg())
  }, 5000)
}

export const ActionMsg = (msg) => {
  return {
    type: 'SET_MSG',
    data: {
      msg
    }
  }
}

export const ResetMsg = () => {
  return {
    type: 'RESET_MSG'
  }
}

export default reducer