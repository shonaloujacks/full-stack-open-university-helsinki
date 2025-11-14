import { createSlice } from "@reduxjs/toolkit" 
import anecdoteService from "../services/anecdotes"


const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      state.push(action.payload)
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

const { createAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initialiseAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes))
  }
}

export const appendAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdotes = await anecdoteService.createNew(content)
    dispatch(createAnecdote(newAnecdotes))
  }
}

export const { voteFor } = anecdoteSlice.actions
export default anecdoteSlice.reducer