import { connect } from "react-redux"
import { addAnecdote } from "../reducers/anecdoteReducer"

const Create = (props) => {
    const add = (event) => {
        event.preventDefault()
        const anecdote = event.target.anecdote.value
        props.addAnecdote(anecdote)
    }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={add}>
                <div><input name="anecdote"/></div>
                <button type="submit">create</button>
            </form>
        </div>
    )
}

const mapDispatchToProps = {
    addAnecdote
}

const ConnectedCreate = connect(null, mapDispatchToProps)(Create)

export default ConnectedCreate