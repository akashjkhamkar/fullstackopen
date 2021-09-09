import { useDispatch } from "react-redux"
import { addAnecdote } from "../reducers/anecdoteReducer"

const Create = () => {
    const dispatch = useDispatch()

    const add = async (event) => {
        event.preventDefault()
        const anecdote = event.target.anecdote.value
        dispatch(addAnecdote(anecdote))
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

export default Create