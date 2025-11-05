import { useDispatch, useSelector } from "react-redux";
import { voteFor } from '../reducers/anecdoteReducer'

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
            <button onClick={() => dispatch(voteFor(anecdote.id))}>vote</button>
          </div>
        </div>
        ))}
      </div>

  )
}

export default AnecdoteList