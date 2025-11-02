import { useDispatch, useSelector } from "react-redux";
import { voteFor } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()

  const anecdotes = useSelector(state => state)
  const sortedAnecdotes = [...anecdotes].sort((a , b) => b.votes - a.votes)

  return (

     <div>
      {sortedAnecdotes.map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => dispatch(voteFor(anecdote.id))}>vote</button>
          </div>
        </div>
        ))}
      </div>

  )
}

export default AnecdoteList