import React from 'react'
import { connect } from 'react-redux'
import { setResults } from '../reducers/queryReducer'

const Filter = (props) => {
    const anecdotes = props.anecdote

    const handleChange = (event) => {
        event.preventDefault()
        const query = event.target.value
        const searchResults = anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(query.toLowerCase()))
        props.setResults(searchResults)
    }

    const style = {
        marginBottom: 10
    }

    return (
        <div style={style}>
            filter <input onChange={handleChange} />
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        anecdote: state.anecdote
    }
}

const mapDispatchToProps = {
    setResults
}

const ConnectedFilter = connect(mapStateToProps, mapDispatchToProps)(Filter)
export default ConnectedFilter