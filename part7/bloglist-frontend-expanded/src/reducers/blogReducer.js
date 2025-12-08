import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
    createBlog(state, action) {
      return state.push(action.payload)
    },
  },
})

const { setBlogs, createBlog } = blogSlice.actions

export const initialiseBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const appendBlog = () => {
  return async (dispatch) => {
    const newBlog = await blogService.create()
    dispatch(createBlog(newBlog))
  }
}

export default blogSlice.reducer
