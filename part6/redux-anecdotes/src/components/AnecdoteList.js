import { useDispatch, useSelector } from "react-redux"
import { voteAnecdote } from "../reducers/anecdoteReducer"
import { notify } from "../reducers/notificationReducer"

const AnecdoteList = () => {
    const dispatch = useDispatch()
    const allAnecdotes = useSelector(state => state.anecdote)
    const queryResults = useSelector(state => state.query)
    
    const anecdotes = queryResults.length === 0 ? allAnecdotes : queryResults;
    
    const vote = (id) => {
      dispatch(voteAnecdote(id))
      const anecdoteVoted = anecdotes.find(anecdote => anecdote.id === id).content
      notify(dispatch, `you voted '${anecdoteVoted}'`)
    }
    
    
    anecdotes.sort((a,b) => {
      return a.votes - b.votes
    })
  
    return (
        <div>
            {anecdotes.map(anecdote =>
              <div key={anecdote.id}>
                <div>
                  {anecdote.content}
                </div>
                <div>
                  has {anecdote.votes}
                  <button onClick={() => vote(anecdote.id)}>vote</button>
                </div>
              </div>
            )}
        </div>
    )
}

export default AnecdoteList