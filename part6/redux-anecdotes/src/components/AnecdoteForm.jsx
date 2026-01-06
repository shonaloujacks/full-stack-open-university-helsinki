import { useDispatch } from "react-redux";
import { appendAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdote = async (event) => {
  event.preventDefault()
  const content = event.target.anecdote.value
  event.target.anecdote.value=''
  dispatch(appendAnecdote(content))
  dispatch(setNotification(`You added ${content}`, 5000))
  }

return (
  <form onSubmit={addAnecdote} >
    <h2>create new</h2>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
)

  
}

export default AnecdoteForm