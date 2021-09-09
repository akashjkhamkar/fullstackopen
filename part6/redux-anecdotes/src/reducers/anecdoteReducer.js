import anecdoteService from '../services/anecdotes'

const asObject = (anecdote) => {
  return {
    content: anecdote,
    votes: 0
  }
}

const reducer = (state = [], action) => {
  switch (action.type) {
    case "INIT":
      return action.data;
    case "VOTE":
      const id = action.data.id
      
      let toVote = state.find(anecdoteId => anecdoteId.id === id)
      toVote = {...toVote, votes: toVote.votes+1}
      
      state = state.map(anecdote => anecdote.id === id ? toVote : anecdote)
      return state
      
    case "ADD":
      return state.concat(action.data)

      default:
      break;
  }
  return state
}

export const voteAnecdote = (anecdote) => {
  return async dispatch => {
    const data = await anecdoteService.put(anecdote, anecdote.id)
    dispatch({
      type: "VOTE",
      data
    })
  }
}

export const addAnecdote = (anecdote) => {
  return async dispatch => {
    const obj = {
      content: anecdote,
      votes:0
    }

    const data = await anecdoteService.add(obj);
    dispatch({
      type: "ADD",
      data
    })
  }
}

export const initAnecdote = () => {
  return async dispatch => {
    const data = await anecdoteService.getAll()
    dispatch({
      type: "INIT",
      data
    })
  }
}

export default reducer