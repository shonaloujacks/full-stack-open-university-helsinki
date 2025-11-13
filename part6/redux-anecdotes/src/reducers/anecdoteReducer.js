import { createSlice } from "@reduxjs/toolkit" 


const getId = () => (100000 * Math.random()).toFixed(0)

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      const content = action.payload
      state.push({
        content,
        votes: 0,
        id: getId()
      })
    },
    voteFor(state, action) {
      const id = action.payload
      const anecdote = state.find((anecdote) => anecdote.id === id)
      if (anecdote) {
        anecdote.votes += 1
      }
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { createAnecdote, voteFor, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer