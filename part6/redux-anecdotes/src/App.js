import {React, useEffect} from 'react'
import { connect } from 'react-redux'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList' 
import Notification from './components/Notification'
import Filter from './components/Filter'

import { initAnecdote } from './reducers/anecdoteReducer'

const App = (props) => {
  useEffect(() => {
    props.initAnecdote()
  }, [props])

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

const mapDispatchToProps = {
  initAnecdote
}

const ConnectApp = connect(null, mapDispatchToProps)(App) 

export default ConnectApp