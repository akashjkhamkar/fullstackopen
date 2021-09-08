import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setResults } from '../reducers/queryReducer'

const Filter = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(state => state.anecdote)

    const handleChange = (event) => {
        event.preventDefault()
        const query = event.target.value
        const searchResults = anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(query.toLowerCase()))
        dispatch(setResults(searchResults))
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

export default Filter