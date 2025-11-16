import { useDispatch, useSelector } from "react-redux";
import { increaseVote } from '../reducers/anecdoteReducer'
import { setNotification } from "../reducers/notificationReducer";


const AnecdoteList = () => {
  const dispatch = useDispatch()

  const anecdotes = useSelector(({ anecdotes, filter }) => {
    if (!filter) return anecdotes
      return anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))

  })
  const sortedAnecdotes = [...anecdotes].sort((a , b) => b.votes - a.votes)

  return (

     <div>
      {sortedAnecdotes.map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => {
              dispatch(increaseVote(anecdote))
              dispatch(setNotification(`You voted for ${anecdote.content}`, 5000))
              }}>vote</button>
          </div>
        </div>
        ))}
      </div>

  )
}

export default AnecdoteList