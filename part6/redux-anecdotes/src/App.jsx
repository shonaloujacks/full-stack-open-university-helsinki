import { useDispatch, useSelector } from 'react-redux'
import { voteFor } from './reducers/anecdoteReducer'
import  AnecdoteForm from './components/AnecdoteForm'

const App = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state)

console.log('THIS IS ANECDOTES', anecdotes)

const sortedAnecdotes = [...anecdotes].sort((a , b) => b.votes - a.votes)

  return (
    <div>
      <h2>Anecdotes</h2>
      {sortedAnecdotes.map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => dispatch(voteFor(anecdote.id))}>vote</button>
          </div>
        </div>
      ))}
      <h2>create new</h2>
      <AnecdoteForm />
    </div>
  )
}

export default App
