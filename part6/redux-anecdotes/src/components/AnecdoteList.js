import { connect } from "react-redux"
import { voteAnecdote } from "../reducers/anecdoteReducer"
import { notify } from "../reducers/notificationReducer"

const AnecdoteList = (props) => {
    const allAnecdotes = props.anecdote
    const queryResults = props.query
    
    const anecdotes = queryResults.length === 0 ? allAnecdotes : queryResults;
    
    const vote = (id) => {
      const anecdoteVoted = anecdotes.find(anecdote => anecdote.id === id)
      props.voteAnecdote({...anecdoteVoted, votes:anecdoteVoted.votes+1})
      props.notify(`you voted '${anecdoteVoted.content}'`, 5000)
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

const mapStateToProps = (state) => {
  return {
    anecdote: state.anecdote,
    query: state.query
  }
}

const mapDispatchToProps = {
  voteAnecdote,
  notify
}

const ConnectedAnecdoteList = connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)
export default ConnectedAnecdoteList